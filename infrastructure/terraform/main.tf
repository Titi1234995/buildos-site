terraform {
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 5.0" }
    vercel = { source = "vercel/vercel", version = "~> 2.0" }
  }
}

provider "aws" {
  region = var.aws_region
}

# S3 for media storage
resource "aws_s3_bucket" "buildos_media" {
  bucket = "buildos-media-${var.environment}"
  force_destroy = var.environment == "staging"
}

resource "aws_s3_bucket_public_access_block" "media" {
  bucket = aws_s3_bucket.buildos_media.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# CloudFront CDN
resource "aws_cloudfront_distribution" "cdn" {
  enabled = true
  origins {
    domain_name = aws_s3_bucket.buildos_media.bucket_regional_domain_name
    origin_id   = "buildos-media"
  }
  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "buildos-media"
    viewer_protocol_policy = "redirect-to-https"
    forwarded_values {
      query_string = false
      cookies { forward = "none" }
    }
  }
  restrictions { geo_restriction { restriction_type = "none" } }
  viewer_certificate { cloudfront_default_certificate = true }
}

# RDS PostgreSQL for application data
resource "aws_db_instance" "buildos_db" {
  identifier           = "buildos-${var.environment}"
  engine              = "postgres"
  engine_version      = "16"
  instance_class      = "db.t4g.small"
  allocated_storage   = 20
  storage_type        = "gp3"
  skip_final_snapshot = var.environment == "staging"
  db_name             = "buildos"
  username           = "buildos_admin"
  password           = var.db_password
  backup_retention_period = var.environment == "production" ? 30 : 7
}

variable "aws_region" { default = "us-east-1" }
variable "environment" { default = "staging" }
variable "db_password" { sensitive = true }
