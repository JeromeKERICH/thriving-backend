// models/Blog.js
const mongoose = require('mongoose');
const slugify = require('slugify');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  excerpt: { type: String },
  content: { type: String }, // store markdown or sanitized HTML
  author: { type: String, default: 'Lucy Kariuki' },
  coverImage: { type: String }, // URL
  images: [{ type: String }],   // extra image URLs used inside content
  tags: [{ type: String }],
  readTime: { type: String },
  views: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: true },
  publishedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// auto-generate slug & readTime
blogSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  if (this.content) {
    const words = this.content.split(/\s+/).length;
    const minutes = Math.max(1, Math.round(words / 200));
    this.readTime = `${minutes} min read`;
  }
  next();
});

module.exports = mongoose.model('Blog', blogSchema);
