# MASTER DEVELOPMENT SPECIFICATION

## Siam Air & Digital Service + Projapoti Print Media
### Digital Service, Photo Studio, Document & Print Management Platform

---

## 1. PROJECT OWNER / BUSINESS
- **Primary Business Name:** Siam Air & Digital Service
- **Associated Business:** Projapoti Print Media
- **Location:** Ramkrishnapur Bazar, Homna, Cumilla, Bangladesh
- **Purpose:** Fast, automated, and organized shop management for daily digital services, customer photo processing, passport photos, document scanning/cleanup, and print-media services.

---

## 2. REFERENCE & CONCEPT
- **Reference Concept:** SohozKaj (workflow, instant customer QR upload, photo studio tools, print layouts).
- **Core Principles:** Custom branding, zero copyright infringement, independent codebase tailored specifically to retail digital service and travel agency shop realities in Bangladesh.

---

## 3. MAIN GOAL
A web-based platform where:
1. Customers scan a counter QR code on their smartphone (no login/registration needed).
2. Customer uploads photos or documents with Name & Phone.
3. Order immediately appears on shop computer Admin Dashboard with a unique Order ID (`SA-2026-000001`).
4. Admin/Operator processes order in built-in tools:
   - Crop / Rotate / Flip / Brightness / Contrast / Saturation
   - Background Color Replacement (White / Blue / Red / Custom)
   - Passport & Visa Photo Maker (35x45mm, 2x2 inch, BD Passport, Indian Visa, etc.)
   - Multi-copy sheet arrangement (4, 6, 8, 12, 16 copies on A4/4R/A6/6R)
   - Signature tool (Background cleanup, 300x100px, 10–100KB target compression)
   - Document photo cleanup / perspective alignment / grayscale / PDF creation
   - Direct local print / download / WhatsApp ready notification
   - Customer pickup & delivery

---

## 4. CORE WORKFLOW
```
Customer
  ↓
QR Code Scan (at shop desk)
  ↓
Mobile-Friendly Upload Form (Name + Mobile + Service Type + Copies + Upload)
  ↓
Submit → Order ID Generated (e.g. SA-2026-000001)
  ↓
Instant Notification in Admin Dashboard (Shop Computer)
  ↓
Order Accepted & Processed in Photo Studio / Document / Print Engine
  ↓
Print on Local Inkjet/Laser Printer / Download / Delivery
  ↓
Automated WhatsApp Notice ("Your Order SA-2026-000001 is ready!")
  ↓
Order Completed & Logged to Customer History
```

---

## 5. DATABASE ARCHITECTURE (Normalized Schema)

### Tables
1. `users` (id, username, password_hash, full_name, role_id, phone, email, is_active, created_at)
2. `roles` (id, role_name [Super Admin, Admin, Photo Editor, Designer, Print Operator, Staff], description)
3. `permissions` (id, permission_key, module)
4. `role_permissions` (role_id, permission_id)
5. `customers` (id, name, phone, email, total_orders, last_visit, created_at)
6. `orders` (id, order_number [e.g. SA-2026-000001], customer_id, customer_name, customer_phone, service_type, status, copies_needed, paper_size, delivery_pref, notes, total_amount, payment_status, created_at, updated_at)
7. `order_files` (id, order_id, original_filename, file_type, file_size_kb, original_path, processed_path, preview_path, status, created_at)
8. `photo_presets` (id, name_en, name_bn, width_mm, height_mm, width_px, height_px, aspect_ratio, bg_color_default, dpi)
9. `print_templates` (id, template_category [Passport Sheet, Visiting Card, Banner, Poster, ID Card], name, sheet_size [A4, 4R, A3], grid_cols, grid_rows, margins_mm, layout_config_json)
10. `audit_logs` (id, user_id, action, target_type, target_id, timestamp, ip_address)
11. `system_settings` (key, value, description)

---

## 6. PHASED DEVELOPMENT ROADMAP

### Phase 1 — MVP (Core Retail Flow)
- Dynamic QR Generator (Desk QR, Service-specific QR)
- Mobile-first Customer Upload (Zero friction, no login)
- Real-time Admin Order Queue with Sound/Badge alert
- Canvas-based Photo Editor (Crop, Rotate, Preset sizing for Passport/Visa/NID)
- Background Color Replacer (Solid White, Blue, Light Blue, Red, Off-White)
- Passport Multi-Copy Layout Generator (4, 6, 8, 12, 16 on A4/4R)
- Signature Resizer & Optimizer (300x100px, 10–100KB target compression)
- One-click Browser Direct Print with standard paper sizes (A4, 4R, A6)
- Customer Lookup by Mobile Number (017XXXXXXXX)
- Pre-filled WhatsApp notification trigger

### Phase 2 — Documents & Media Design
- Document Scanner / Perspective Straightener / Grayscale filter
- JPG to PDF / Multi-image merging into PDF / PDF Split
- Projapoti Print Media Template Engine (Editable fields: `{{customer_name}}`, `{{mobile}}`, `{{address}}`, `{{price}}`)
- Bulk Photo Processing (Batch crop, uniform background, batch passport layout)
- Revenue & Daily Work Reporting (CSV/PDF Export)

### Phase 3 — AI & Full Automation
- AI-based instant background removal
- Facial enhancement and automatic passport head-centering check
- WhatsApp Business Cloud API & SMS gateway integration
- Cloud storage backup (Google Drive / S3 / Backblaze)
