source "https://rubygems.org"

# GitHub Pages and Jekyll
gem "github-pages", group: :jekyll_plugins
gem "jekyll", "~> 4.3.0"

# Jekyll plugins
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-seo-tag", "~> 2.8"
  gem "jekyll-sitemap", "~> 1.4"
  gem "jekyll-paginate", "~> 1.1"
  gem "jekyll-archives", "~> 2.2"
  gem "jekyll-include-cache", "~> 0.2"
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds since newer versions of the gem
# do not have a Java counterpart.
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]

# Use 0.18.4 or greater for built-in error page generation
gem "webrick", "~> 1.8"

# If you have any plugins, put them here!
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-seo-tag", "~> 2.8"
  gem "jekyll-sitemap", "~> 1.4"
  gem "jekyll-paginate", "~> 1.1"
  gem "jekyll-archives", "~> 2.2"
  gem "jekyll-include-cache", "~> 0.2"
  gem "jekyll-redirect-from", "~> 0.16"
  gem "jekyll-relative-links", "~> 0.6"
  gem "jekyll-avatar", "~> 0.7"
  gem "jekyll-mentions", "~> 1.6"
  gem "jekyll-optional-front-matter", "~> 0.3"
  gem "jekyll-picture-tag", "~> 1.13"
  gem "jekyll-remote-theme", "~> 0.4"
  gem "jekyll-sass-converter", "~> 2.2"
  gem "jekyll-titles-from-headings", "~> 0.5"
  gem "jemoji", "~> 0.12"
  gem "kramdown-parser-gfm", "~> 1.1"
  gem "minima", "~> 2.5"
  gem "nokogiri", "~> 1.13"
  gem "rouge", "~> 3.26"
  gem "webmention", "~> 0.2"
  gem "html-proofer", "~> 3.19"
end
