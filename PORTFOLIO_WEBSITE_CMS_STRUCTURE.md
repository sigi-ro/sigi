# Portfolio Website Structure - Using Existing CMS/CRM Tables

## Architecture

The portfolio website for `illustratordemo` tenant is built entirely using SIGI's existing CMS and CRM modules, following the same patterns as `minducate`.

---

## CMS Pages Structure

**Using:** `cms_pages`, `cms_layouts`, `cms_templates`, `cms_content`, `cms_metadata`

### Page Hierarchy

```
Home (portfolio)
├── Digital Paintings (digital-paintings)
├── Comics (comics)
├── Miscellaneous (misc)
├── About (about)
└── Contact (contact)
```

### Database Structure

| ID | Name | Slug | Parent ID | Layout | Template |
|---|---|---|---|---|---|
| 8 | Andrei Cotoi - Illustrator & Comic Book Writer | home | NULL | 1 | 2 |
| 9 | Digital Paintings | digital-paintings | 8 | 1 | 2 |
| 10 | Comics | comics | 8 | 1 | 2 |
| 11 | Miscellaneous | misc | 8 | 1 | 2 |
| 12 | About | about | 8 | 1 | 2 |
| 13 | Contact | contact | 8 | 1 | 2 |

### Content Management

Each page uses:
- **Template Fields** (`cms_template_fields`) - Define editable sections
- **Content** (`cms_content`) - Store actual content for each field
- **Metadata** (`cms_metadata`) - Store SEO data, images, etc.

---

## CRM Forms Structure

**Using:** `crm_forms`, `crm_form_fields`, `crm_form_submissions`

### Contact Form

```
Form ID: 2
Name: Portfolio Contact
Slug: portfolio-contact
Email Recipients: andrei@example.com
Success Message: "Thank you for your message! I will get back to you soon."
```

### Form Fields

| ID | Type | Name | Slug | Required |
|---|---|---|---|---|
| 5 | text | Name | name | Yes |
| 6 | email | Email | email | Yes |
| 7 | text | Subject | subject | Yes |
| 8 | textarea | Message | message | Yes |

---

## How to Add Content to Portfolio Pages

### Adding Portfolio Items (Digital Paintings, Comics, etc.)

1. **Create content in admin panel** → Admin > CMS > Pages
2. **Edit the respective category page** (Digital Paintings, Comics, etc.)
3. **Add template fields** for:
   - Item title
   - Item image
   - Item description
   - External links (GitHub, Live project)
   - Gallery images

### Adding Text Content

Content is stored in `cms_content` table using a polymorphic relationship:
- `contentable_type` = 'App\\Models\\CMS\\Page'
- `contentable_id` = page ID
- `template_field_id` = field definition
- `data` = JSON content (supports rich text, images, etc.)

### Adding Images

Use the **File Manager** in admin panel to upload images, then reference them in:
- Template fields data
- Metadata (og:image, featured_image, etc.)

---

## CMS Components Usage

### Hero Section
- **Page:** Home (home)
- **Content:** Title, subtitle, background images
- **Source:** Template fields + metadata

### Gallery/Portfolio Items
- **Pages:** Digital Paintings, Comics, Miscellaneous
- **Content:** Item title, featured image, gallery images, description
- **Source:** Template fields (repeatable if supported) or separate content records

### About Section
- **Page:** About (about)
- **Content:** Artist bio, photo, CV/experience
- **Source:** Template fields + metadata

### Contact Section
- **Page:** Contact (contact)
- **Form:** Portfolio Contact form (ID: 2)
- **Fields:** Name, Email, Subject, Message
- **Source:** Existing CRM form submission system

---

## Frontend Rendering

The website is rendered using the existing website routes that pull from:

1. **Pages**: `GET /` → Home page with hero + galleries
2. **Categories**: Rendered from page hierarchy
3. **Contact Form**: `POST /contact` → CRM form submission

All content is managed through the admin interface:
- `/admin/cms/pages` - Page management
- `/admin/cms/templates` - Template definition
- `/admin/crm/forms` - Contact form

---

## Adding More Features

### To Add Portfolio Items (without new migrations):

**Option 1: Using Page Hierarchy**
- Create sub-pages under category pages
- Each item = a child page with template

**Option 2: Using Content Repeater**
- Store multiple items as JSON in a single page's template field

### To Add Testimonials:
- Create a "Testimonials" page with repeatable content fields

### To Add Client List:
- Create a "Clients" page with JSON array of client data

---

## Key Benefits

✅ **No new database tables** - Reuses existing CMS/CRM
✅ **Same admin interface** - Uses existing admin panels
✅ **Familiar patterns** - Follows minducate structure
✅ **Flexible** - Supports all content types via templates and fields
✅ **Scalable** - Can add unlimited portfolio items through content fields
✅ **Multi-tenant ready** - Full tenant isolation maintained

---

## Database Tables Used

| Table | Purpose |
|-------|---------|
| `cms_pages` | Define page structure and hierarchy |
| `cms_layouts` | Define page layout templates |
| `cms_templates` | Define content structure/fields |
| `cms_template_fields` | Define individual content fields |
| `cms_content` | Store actual content for each field |
| `cms_metadata` | Store SEO, images, etc. |
| `cms_urls` | Custom URL routing |
| `crm_forms` | Contact form definition |
| `crm_form_fields` | Contact form fields |
| `crm_form_submissions` | Contact form submissions |

---

## Next Steps

1. **Configure template fields** for each page type via admin
2. **Add content** through admin CMS interface
3. **Style the frontend** using existing Vue components
4. **Test contact form** submissions
5. **Deploy** with other tenants

No additional migrations or models needed! Everything uses existing SIGI infrastructure.
