# Contributing to Telecom Security Library

Thank you for your interest in contributing to the Telecom Security Library! This document provides guidelines for contributing research, documentation, and improvements to our project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Submitting Research Papers](#submitting-research-papers)
- [Reporting Issues](#reporting-issues)
- [Pull Request Process](#pull-request-process)
- [Documentation Standards](#documentation-standards)

## Code of Conduct

This project adheres to the Contributor Covenant [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Submitting Research Papers

We welcome high-quality research papers on telecommunications security topics:

1. **Ensure Relevance**: Papers should relate to one of our [13 categories](README.md#document-categories)
2. **Check Quality**: Research should be technically sound and well-documented
3. **Verify Originality**: Ensure you have rights to share the research
4. **Use the Template**: Submit via our [Research Submission Issue Template](.github/ISSUE_TEMPLATE/research_submission.yml)

**Accepted Formats:**
- PDF research papers
- Technical whitepapers
- Conference presentations
- Case studies

### Reporting Issues

Found a problem? Help us improve:

- **Broken Links**: Use the [Bug Report template](.github/ISSUE_TEMPLATE/bug_report.yml)
- **Outdated Information**: Create an issue with details and sources
- **Missing Content**: Suggest additions via [Feature Request](.github/ISSUE_TEMPLATE/feature_request.yml)

### Suggesting Enhancements

Have ideas for improvements?

1. Check existing issues to avoid duplicates
2. Use the Feature Request template
3. Provide clear use cases and benefits
4. Include examples if applicable

## Pull Request Process

### Before Submitting

1. **Fork the repository** and create your branch from `main`
2. **Test your changes** locally using `npm start`
3. **Run validation** with `npm run validate`
4. **Update documentation** if you've changed functionality

### Submission Guidelines

1. **Clear Description**: Explain what and why, not just how
2. **Link Issues**: Reference related issues using `#issue-number`
3. **Small Commits**: Keep changes focused and atomic
4. **Follow Standards**: Match existing code style and structure

### PR Checklist

- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my changes
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation accordingly
- [ ] My changes generate no new warnings or errors
- [ ] I have tested my changes locally

## Documentation Standards

### File Organization

- Place research papers in appropriate category folders (e.g., `5G/`, `SS7/`)
- Use descriptive filenames: `author-year-topic.pdf`
- Include metadata in YAML format when applicable

### Markdown Guidelines

- Use clear, concise language
- Include table of contents for long documents
- Add links to related resources
- Use proper heading hierarchy (H1 → H2 → H3)

### Commit Messages

Follow conventional commit format:

```
type(scope): brief description

Detailed explanation if needed

Fixes #issue-number
```

**Types:**
- `feat`: New feature or research paper
- `fix`: Bug fix or correction
- `docs`: Documentation changes
- `chore`: Maintenance tasks

**Examples:**
```
feat(5g): add OpenRAN security research paper

docs(readme): update video section with new content

fix(links): correct broken references in SS7 section
```

## Research Submission Process

### Step 1: Prepare Your Submission

- Ensure PDF is readable and properly formatted
- Include author information and publication date
- Add abstract or summary (100-200 words)
- List key topics and tags

### Step 2: Create Issue

Use the Research Submission template and provide:

- Paper title and authors
- Publication date and venue (if applicable)
- Category (4G, 5G, SS7, etc.)
- Brief summary
- Link to paper or attach file

### Step 3: Review Process

1. **Initial Review** (1-3 days): We verify relevance and quality
2. **Technical Review** (3-7 days): Subject matter experts review content
3. **Integration** (1-2 days): Paper is added to appropriate category
4. **Publication**: Changes are deployed to GitHub Pages

## Getting Help

- **Questions**: Open a [Discussion](https://github.com/TelcoSec/Telecom-Security-Documents/discussions)
- **Chat**: Join our [Discord community](https://discord.gg/jkUKw2cBxX)
- **Email**: contact@telcosec.org

## Recognition

Contributors are recognized in:

- Repository contributors list
- Annual acknowledgments
- Community highlights

---

**Thank you for helping improve telecommunications security knowledge!**
