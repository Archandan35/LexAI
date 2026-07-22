# UI Layout Analysis – Create Invoice Page



## 1. Page Overview



**Page Title**



* Create Invoice



**Purpose**



* Create a new sales invoice by selecting a customer, adding products/services, applying discounts, entering notes and payment information, attaching files, and saving or printing the invoice.



**Estimated Total Major Sections**



1. Page Header

2. Customer & Invoice Details

3. Custom Headers

4. Products & Services

5. Notes

6. Terms & Conditions

7. Options & Attachments

8. Invoice Summary

9. Bank Details

10. Payment Details

11. Signature

12. Bottom Action Bar



---



# 2. Section-wise Analysis



---



# Section 1: Page Header



### Description



Top toolbar containing invoice metadata and page actions.



### Row 1 (3 Columns)



| Column | Field          | Type         |

| ------ | -------------- | ------------ |

| 1      | Create Invoice | Page Heading |

| 2      | Type           | Dropdown     |

| 3      | Invoice Number | Text/Input   |



### Right Header Actions



* Custom Headers (Toggle/Link)

* Settings (Icon/Link)



---



# Section 2: Customer & Invoice Details



### Row 1 (4 Columns)



| Column | Label           | Type                |

| ------ | --------------- | ------------------- |

| 1      | Select Customer | Searchable Dropdown |

| 2      | Invoice Date    | Date Picker         |

| 3      | Due Date        | Date Picker         |

| 4      | Reference       | Text Input          |



### Visible Placeholder



**Select Customer**



* Search customers by name, company, GSTIN, tags...



**Reference**



* Reference, e.g. PO Number, Sales Person names, Shipment Number etc... (Optional)



### Visible Default Values



Invoice Date



* 21-07-2026



Due Date



* 21-07-2026



Reference



* Empty



Customer



* Empty



---



# Section 3: Custom Headers



Small horizontal chip/button group.



### Row 1



* Vehicle No

* E-way Number

* Challan No

* Delivery Date

* Sales Person

* Dispatch Number



(Type: Small outline buttons/chips)



---



# Section 4: Products & Services



## Toolbar



### Row 1



| Column | Control                                    | Type           |

| ------ | ------------------------------------------ | -------------- |

| 1      | Filter Category                            | Dropdown       |

| 2      | Search or scan barcode for adding products | Search Box     |

| 3      | Qty                                        | Numeric Input  |

| 4      | + Add to Bill                              | Primary Button |

| 5      | Create Invoice with AI                     | Link           |

| 6      | New                                        | Link           |



Right side



* Show description (Checkbox)



---



## Product Table



### Visible Headers



* Product Name

* Quantity

* Unit Price

* Price with Tax

* Discount

* Total Amount



Right aligned



* Total

* Net Amount

* Tax



---



## Empty State



Centered Illustration



Message



> Search existing products to add to this list or add new product to get started



Button



* Add New Product



---



## Bottom Toolbar



Left



Apply discount(s) to all items



* Numeric/Text input



Right



* Additional Charges (Outline Button)



---



# Section 5: Notes, Terms & More



Accordion/Card



---



## Notes



### Row 1



Notes (Accordion)



Right



* * New Notes



### Row 2



Large Textarea



Placeholder



Enter your notes, say thanks, or anything else



Bottom Left



* AI chip/button



---



# Section 6: Terms & Conditions



Accordion



### Row 1



Terms & Conditions



Right



* * New Terms



(No expanded textarea visible.)



---



# Section 7: Options & Attachments



Vertical list



### Row 1



Reverse Charge Mechanism applicable?



Checkbox



---



### Row 2



Create E-Waybill



Checkbox



---



### Row 3



Create E-Invoice



Checkbox



---



### Row 4



Attach Files



Upload Control



Button



Attach Files (Max 5)



---



# Section 8: Invoice Summary



Right-side summary panel



Contains



* TDS

* TCS

* Extra Discount

* Taxable Amount

* Total Tax

* Round Off

* Total Amount

* Total Discount



Values currently



₹0.00



Total Amount



₹0.00



---



# Section 9: Bank Details



### Row 1



Select Bank



Dropdown



### Row 2



Large Button



Add Bank to Invoice (Optional)



---



# Section 10: Payment Details



Heading



Add payment (Payment Notes, Amount and Mode)



Right



Mark as fully paid



Checkbox



---



### Payment Grid



Columns



| Column       | Field |

| ------------ | ----- |

| Notes        |       |

| Amount       |       |

| Payment Date |       |

| Payment Mode |       |



Visible Defaults



Amount



0



Payment Date



21-07-2026



Payment Mode



Cash



Bottom



Split Payment



Checkbox



---



# Section 11: Signature



Heading



Select Signature



Required Indicator



Visible red asterisk



Row 1



Signature Dropdown



Default



No Signature



Right



Add New Signature



Link



Preview Area



Signature on the document



---



# Section 12: Bottom Action Bar



Bottom Right



Three buttons



1. Save as Draft

2. Save and Print

3. Save



---



# 3. Buttons & Actions



| Button                         | Type          | Position         | Alignment |

| ------------------------------ | ------------- | ---------------- | --------- |

| Create Customer                | Link          | Customer Section | Right     |

| Add to Bill                    | Primary       | Product Toolbar  | Left      |

| Create Invoice with AI         | Link          | Product Toolbar  | Left      |

| New                            | Link          | Product Toolbar  | Left      |

| Add New Product                | Primary       | Product Area     | Center    |

| Additional Charges             | Outline       | Product Bottom   | Right     |

| New Notes                      | Secondary     | Notes            | Right     |

| AI                             | Chip          | Notes            | Left      |

| New Terms                      | Secondary     | Terms            | Right     |

| Attach Files                   | Upload Button | Left Panel       | Left      |

| Add Bank to Invoice (Optional) | Outline       | Right Panel      | Center    |

| Add New Signature              | Link          | Signature        | Right     |

| Save as Draft                  | Secondary     | Footer           | Right     |

| Save and Print                 | Secondary     | Footer           | Right     |

| Save                           | Primary       | Footer           | Right     |



---



# 4. Tables



## Product Table



### Headers



* Product Name

* Quantity

* Unit Price

* Price with Tax

* Discount

* Total Amount



### Features



* Category Filter

* Search Box

* Barcode Search

* Quantity Input

* Add to Bill

* AI Invoice Link

* Add Product

* Additional Charges

* Empty State

* Description Toggle



No pagination visible.



No bulk actions visible.



No row selection visible.



No sorting indicators visible.



---



# 5. Navigation Elements



## Header



* Create Invoice

* Invoice Type Dropdown

* Invoice Number

* Custom Headers

* Settings



No breadcrumb visible.



No sidebar visible.



No tabs visible.



---



# 6. Cards, Panels & Components



Present Components



* Header Toolbar

* Customer Card

* Invoice Detail Form

* Chip Group

* Product Table

* Empty State Illustration

* Accordion (Notes)

* Accordion (Terms)

* Summary Card

* Bank Panel

* Payment Grid

* Signature Panel

* Upload Component

* Date Pickers

* Searchable Dropdown

* Standard Dropdowns

* Checkboxes

* Textarea

* File Upload

* Action Footer



---



# 7. Layout Structure



Overall Layout



```

Header



Customer Section (Full Width)



Products Section (Full Width)



----------------------------------------



LEFT COLUMN (≈50%)



Notes

Terms

Options

Attachments



RIGHT COLUMN (≈50%)



Invoice Summary

Bank

Payment

Signature



----------------------------------------



Footer Actions

```



Responsive Characteristics (Visible)



* Wide desktop grid

* Full-width product table

* Two-column lower section

* Footer actions aligned right

* Consistent spacing with bordered cards



---



# 8. Complete Field Inventory



| Section   | Row    | Column | Label                                | Type            |

| --------- | ------ | ------ | ------------------------------------ | --------------- |

| Header    | 1      | 1      | Type                                 | Dropdown        |

| Header    | 1      | 2      | Invoice Number                       | Input           |

| Customer  | 1      | 1      | Select Customer                      | Search Dropdown |

| Customer  | 1      | 2      | Invoice Date                         | Date Picker     |

| Customer  | 1      | 3      | Due Date                             | Date Picker     |

| Customer  | 1      | 4      | Reference                            | Textbox         |

| Products  | 1      | 1      | Filter Category                      | Dropdown        |

| Products  | 1      | 2      | Search Product                       | Search          |

| Products  | 1      | 3      | Qty                                  | Numeric         |

| Products  | Table  | 1      | Product Name                         | Table Column    |

| Products  | Table  | 2      | Quantity                             | Table Column    |

| Products  | Table  | 3      | Unit Price                           | Table Column    |

| Products  | Table  | 4      | Price with Tax                       | Table Column    |

| Products  | Table  | 5      | Discount                             | Table Column    |

| Products  | Table  | 6      | Total Amount                         | Table Column    |

| Products  | Bottom | 1      | Apply discount(s) to all items       | Input           |

| Notes     | 2      | 1      | Notes                                | Textarea        |

| Options   | 1      | 1      | Reverse Charge Mechanism applicable? | Checkbox        |

| Options   | 2      | 1      | Create E-Waybill                     | Checkbox        |

| Options   | 3      | 1      | Create E-Invoice                     | Checkbox        |

| Options   | 4      | 1      | Attach Files                         | Upload          |

| Bank      | 1      | 1      | Select Bank                          | Dropdown        |

| Payment   | 1      | 1      | Notes                                | Textbox         |

| Payment   | 1      | 2      | Amount                               | Number          |

| Payment   | 1      | 3      | Payment Date                         | Date Picker     |

| Payment   | 1      | 4      | Payment Mode                         | Dropdown        |

| Payment   | 2      | 1      | Split Payment                        | Checkbox        |

| Signature | 1      | 1      | Select Signature                     | Dropdown        |



---



# 9. UI Observations



### Positive



* Clean enterprise ERP layout.

* Strong grouping of related information.

* Logical top-to-bottom workflow.

* Lower section effectively split into two columns.

* Large working area for products.



### Observations



* Many optional actions are represented as small links, making them less prominent.

* Product table appears sparse when empty.

* Summary panel uses light background for emphasis.

* Signature preview area is oversized relative to current content.

* Notes and Terms use collapsible accordions.

* Product empty state clearly guides the user.



No obvious duplicate fields are visible.



---



# 10. Text Wireframe (ASCII Layout)



```text

──────────────────────────────────────────────────────────────────────────────────────────────

                               CREATE INVOICE

──────────────────────────────────────────────────────────────────────────────────────────────



Type ▼        Invoice No.



┌──────────────────────────────┬──────────────┬──────────────┬──────────────────────────────┐

│ Select Customer              │ Invoice Date │ Due Date     │ Reference                    │

│ [ Search Customer________ ]  │ [21-07-26 ]  │ [21-07-26 ]  │ [_________________________]  │

└──────────────────────────────┴──────────────┴──────────────┴──────────────────────────────┘



Vehicle No | E-way Number | Challan No | Delivery Date | Sales Person | Dispatch Number



──────────────────────────────────────────────────────────────────────────────────────────────

PRODUCTS & SERVICES



┌──────────────┬─────────────────────────────┬─────┬──────────────┬──────────────┐

│Category ▼    │ Search Products             │Qty  │ Add to Bill  │ AI Invoice   │

└──────────────┴─────────────────────────────┴─────┴──────────────┴──────────────┘



┌────────────────────────────────────────────────────────────────────────────────────────────┐

│ Product Name | Qty | Unit Price | Price with Tax | Discount | Total Amount               │

│                                                                            (Empty State)  │

│                              [ Add New Product ]                                         │

└────────────────────────────────────────────────────────────────────────────────────────────┘



Apply Discount [_____]                                     [ Additional Charges ]



==============================================================================================



LEFT COLUMN                                   RIGHT COLUMN



┌────────────────────────────┐               ┌────────────────────────────────────┐

│ Notes                      │               │ Invoice Summary                    │

│ [ Large Textarea ]          │               │ Taxable Amount                    │

└────────────────────────────┘               │ Total Tax                         │

                                             │ Total Amount                      │

┌────────────────────────────┐               └────────────────────────────────────┘

│ Terms & Conditions         │

└────────────────────────────┘               ┌────────────────────────────────────┐

                                             │ Select Bank                        │

☐ Reverse Charge                            │ [ Dropdown ]                       │

☐ Create E-Waybill                          │ Add Bank to Invoice                │

☐ Create E-Invoice                          └────────────────────────────────────┘



Attach Files



                                             ┌────────────────────────────────────┐

                                             │ Payment                            │

                                             │ Notes | Amount | Date | Mode       │

                                             └────────────────────────────────────┘



                                             ┌────────────────────────────────────┐

                                             │ Select Signature                   │

                                             │ [ No Signature ▼ ]                 │

                                             └────────────────────────────────────┘



                                      [ Save as Draft ]

                               [ Save and Print ]

                                      [ Save ]

```



This page follows a **large enterprise ERP/CRM invoice creation workflow**, with a **single full-width data-entry area** followed by a **two-column financial details layout**, making it well suited for high-volume invoice processing.



# UI Layout Analysis – Document Settings (Right Slide-over Panel)

> **Context:** This panel opens from the **Settings** button located beside **Custom Headers** on the **Create Invoice** page. It appears as a **right-side slide-over (drawer)** while the invoice page remains visible but dimmed in the background.

---

# 1. Page Overview

### Page Title

**Document settings**

### Purpose

Configure invoice/PDF generation settings including:

* Invoice templates
* PDF display options
* Layout & fonts
* Export settings
* Branding
* Footer text
* Header/Footer images
* Banner images
* Company details
* HSN/SAC options
* Quantity display
* Pricing settings

### Page Type

* Right Slide-over Drawer
* Settings Panel
* Scrollable Form
* Multi-section Configuration Page

### Total Major Sections

1. Header
2. Quick Actions
3. Customization Tabs
4. Display
5. Quantities
6. Pricing & Discounts
7. Company & HSN/SAC
8. Layout & Fonts
9. Page Setup
10. Table & Content
11. Margins
12. Export
13. Branding
14. Footer Text
15. Header & Footer Images
16. Banner Images
17. Bottom Actions

**Total: 17 Sections**

---

# 2. Section-wise Analysis

---

# Section 1 — Header

### Row 1 (3 Columns)

| Column | Control           | Type           |
| ------ | ----------------- | -------------- |
| 1      | ← Close           | Icon Button    |
| 2      | Document settings | Page Heading   |
| 3      | Save changes      | Primary Button |

---

# Section 2 — Quick actions

Contains four shortcut cards.

### Row 1 (4 Columns)

### Column 1

**Invoice templates**

Description

> Professional templates for every business need

Card

---

### Column 2

**Custom fields**

Description

> Add custom fields in the PDFs that suit your business.

Card

Lock icon visible.

---

### Column 3

**Prefixes / suffixes**

Description

> Customize invoice serial numbers and sequences.

Card

---

### Column 4

**Notes and terms**

Description

> Default footer text, terms, and notes on PDFs.

Card

---

# Section 3 — Customization Tabs

Horizontal pill navigation.

### Row 1

* Display (Active)
* Layout & Fonts
* Export
* Branding
* Customize Labels
* Email / WhatsApp templates

Type

Pill Tabs

---

# Section 4 — Display

## General

### Row 1 (2 Columns)

| Left        | Right            |
| ----------- | ---------------- |
| Show Images | Show Net Balance |

Toggle switches

---

### Row 2

| Left               | Right         |
| ------------------ | ------------- |
| Show Previous Dues | Show Due Date |

---

### Row 3

| Left                  | Right         |
| --------------------- | ------------- |
| Show Dispatch Address | Show Payments |

---

### Row 4

| Left           | Right                     |
| -------------- | ------------------------- |
| Show Round Off | Show Receiver's Signature |

---

# Section 5 — Quantities

### Row 1

Hide Quantity

Show Quantity with 3 decimals

---

### Row 2

Show Quantity Conversion Rate

(blank)

---

Controls

Toggle switches

---

# Section 6 — Pricing & Discounts

### Row 1

Hide Discount

Show Discount Column

---

### Row 2

Decimals for item prices on PDFs

Dropdown

Default

2

---

# Section 7 — Company & HSN/SAC

### Row 1

Hide HSN/SAC

Show Company Details

---

### Row 2

Show HSN/SAC Summary

Show HSN/SAC Summary on

Dropdown

Default

+10

---

# Section 8 — Layout & Fonts

### Language & Font

### Row 1

Select Language in PDF

Dropdown

Default

English (Default)

---

Select Font Style in PDF

Dropdown

Default

Stylish

---

### Row 2

PDF font size

Radio Buttons

* Small
* Normal
* Large

Normal appears selected.

---

# Section 9 — Page Setup

### Row 1

PDF Orientation

Dropdown

Default

Portrait

---

Repeat Header

Toggle

---

# Section 10 — Table & Content

### Row 1

Enable Item Headers

Toggle

Show full page

Toggle

---

### Row 2

Show Striped Rows

Toggle

---

# Section 11 — Margins

### Row 1 (4 Columns)

| Field             | Type         |
| ----------------- | ------------ |
| PDF margin top    | Number Input |
| PDF margin bottom | Number Input |
| PDF margin left   | Number Input |
| PDF margin right  | Number Input |

Visible Defaults

Top

0

Bottom

0

Left

24

Right

24

---

# Section 12 — Export

### Row 1

Show Conversion Factor

Toggle

Show in INR

Toggle

---

# Section 13 — Branding

## Color & Watermark

### Row 1 (3 Columns)

Column 1

PDF accent color

Color Picker

Default

#276EF1

---

Column 2

Hex Color

Textbox

Default

#276EF1

---

Column 3

Watermark

Image Preview

Swipe logo

---

# Section 14 — Footer Text

### Row 1 (2 Columns)

PDF footer

Textarea

Placeholder / Default

Swipe | Simple Invoicing, Billing and Payments | Visit getswipe.in

---

Thermal Print Footer

Textarea

Default

Powered by Swipe POS, [https://getSwipe.in](https://getSwipe.in)

---

# Section 15 — Header & Footer Images

### Row 1 (2 Columns)

Header

Image Upload

Upload Box

---

Footer

Image Upload

Upload Box

---

# Section 16 — Banner Images

### Row 1 (2 Columns)

Banner Image - Top

Upload

---

Banner Image - Bottom

Upload

---

# Section 17 — Bottom Actions

### Row 1

Left

Save changes

Primary Button

Next

Cancel

Secondary Button

---

# 3. Buttons & Actions

| Button                     | Type      | Position  |
| -------------------------- | --------- | --------- |
| Close                      | Icon      | Top Left  |
| Save changes               | Primary   | Top Right |
| Invoice templates          | Card      | Top       |
| Custom fields              | Card      | Top       |
| Prefixes / suffixes        | Card      | Top       |
| Notes and terms            | Card      | Top       |
| Display                    | Tab       | Top       |
| Layout & Fonts             | Tab       | Top       |
| Export                     | Tab       | Top       |
| Branding                   | Tab       | Top       |
| Customize Labels           | Tab       | Top       |
| Email / WhatsApp templates | Tab       | Top       |
| Upload (Header)            | Upload    | Bottom    |
| Upload (Footer)            | Upload    | Bottom    |
| Upload (Banner Top)        | Upload    | Bottom    |
| Upload (Banner Bottom)     | Upload    | Bottom    |
| Save changes               | Primary   | Footer    |
| Cancel                     | Secondary | Footer    |

---

# 4. Tables

No data tables are present.

Only configuration forms and cards.

---

# 5. Navigation Elements

## Drawer Navigation

* Close Icon

## Quick Action Cards

* Invoice templates
* Custom fields
* Prefixes / suffixes
* Notes and terms

## Tab Navigation

* Display
* Layout & Fonts
* Export
* Branding
* Customize Labels
* Email / WhatsApp templates

No sidebar.

No breadcrumbs.

---

# 6. Cards, Panels & Components

Visible Components

* Right Slide Drawer
* Sticky Header
* Primary Button
* Secondary Button
* Quick Action Cards
* Pill Tabs
* Section Cards
* Toggle Switches
* Dropdowns
* Radio Buttons
* Numeric Inputs
* Color Picker
* Hex Text Input
* Watermark Preview
* Upload Drop Zones
* Textareas
* Scrollable Container

---

# 7. Layout Structure

```text
Right Slide Drawer
│
├── Sticky Header
│
├── Quick Action Cards (4 Columns)
│
├── Tab Navigation
│
├── Display Card
│
├── Quantities Card
│
├── Pricing Card
│
├── Company & HSN Card
│
├── Layout & Fonts Card
│
├── Page Setup Card
│
├── Table & Content Card
│
├── Margins Card
│
├── Export Card
│
├── Branding Card
│
├── Footer Text Card
│
├── Header/Footer Images Card
│
├── Banner Images Card
│
└── Sticky Footer Actions
```

Layout Pattern

* Single vertical scroll
* Every configuration grouped into bordered cards
* Most settings use a **2-column grid**
* Consistent spacing between sections
* Sticky header and footer improve usability

---

# 8. Complete Field Inventory

| Section         | Field                            | Type         |
| --------------- | -------------------------------- | ------------ |
| Display         | Show Images                      | Toggle       |
| Display         | Show Net Balance                 | Toggle       |
| Display         | Show Previous Dues               | Toggle       |
| Display         | Show Due Date                    | Toggle       |
| Display         | Show Dispatch Address            | Toggle       |
| Display         | Show Payments                    | Toggle       |
| Display         | Show Round Off                   | Toggle       |
| Display         | Show Receiver's Signature        | Toggle       |
| Quantities      | Hide Quantity                    | Toggle       |
| Quantities      | Show Quantity with 3 decimals    | Toggle       |
| Quantities      | Show Quantity Conversion Rate    | Toggle       |
| Pricing         | Hide Discount                    | Toggle       |
| Pricing         | Show Discount Column             | Toggle       |
| Pricing         | Decimals for item prices on PDFs | Dropdown     |
| Company         | Hide HSN/SAC                     | Toggle       |
| Company         | Show Company Details             | Toggle       |
| Company         | Show HSN/SAC Summary             | Toggle       |
| Company         | Show HSN/SAC Summary on          | Dropdown     |
| Layout          | Select Language in PDF           | Dropdown     |
| Layout          | Select Font Style in PDF         | Dropdown     |
| Layout          | PDF font size                    | Radio Group  |
| Page Setup      | PDF Orientation                  | Dropdown     |
| Page Setup      | Repeat Header                    | Toggle       |
| Table & Content | Enable Item Headers              | Toggle       |
| Table & Content | Show full page                   | Toggle       |
| Table & Content | Show Striped Rows                | Toggle       |
| Margins         | PDF margin top                   | Number       |
| Margins         | PDF margin bottom                | Number       |
| Margins         | PDF margin left                  | Number       |
| Margins         | PDF margin right                 | Number       |
| Export          | Show Conversion Factor           | Toggle       |
| Export          | Show in INR                      | Toggle       |
| Branding        | PDF accent color                 | Color Picker |
| Branding        | Hex Color                        | Textbox      |
| Footer          | PDF footer                       | Textarea     |
| Footer          | Thermal Print Footer             | Textarea     |
| Images          | Header                           | Image Upload |
| Images          | Footer                           | Image Upload |
| Banner          | Banner Image - Top               | Image Upload |
| Banner          | Banner Image - Bottom            | Image Upload |

---

# 9. UI Observations

### Strengths

* Clean enterprise settings interface.
* Settings logically grouped by functionality.
* Two-column layout minimizes scrolling.
* Consistent card design throughout.
* Sticky top and bottom actions improve usability.
* Drawer allows editing without leaving the invoice page.

### Observations

* Many toggles rely on descriptive text rather than grouping, making scanning slightly slower.
* Some dropdowns (e.g., "Show HSN/SAC Summary on") appear disabled until related toggles are enabled.
* Several fields include lock icons, indicating premium or restricted functionality.
* Background invoice remains visible, helping users maintain context while editing settings.
* Upload areas use minimal placeholder UI with clear "Upload" affordances.

---

# 10. Text Wireframe (ASCII Layout)

```text
──────────────────────────────────────────────────────────────────────────────
←  Document settings                                     [ Save changes ]
──────────────────────────────────────────────────────────────────────────────

Quick actions

┌──────────────┬──────────────┬──────────────┬──────────────┐
│Invoice       │Custom Fields │Prefixes/     │Notes & Terms │
│Templates     │              │Suffixes      │              │
└──────────────┴──────────────┴──────────────┴──────────────┘

[Display] [Layout & Fonts] [Export] [Branding]
[Customize Labels] [Email / WhatsApp templates]

──────────────────────────────────────────────────────────────────────────────
DISPLAY

Show Images                     ○────●      Show Net Balance          ○────●
Show Previous Dues              ○────○      Show Due Date             ○────●
Show Dispatch Address           ○────●      Show Payments             ○────●
Show Round Off                  ○────●      Show Receiver Signature   ○────○

──────────────────────────────────────────────────────────────────────────────
QUANTITIES

Hide Quantity                   ○────○      Show Qty with 3 decimals  ○────○
Show Qty Conversion Rate        ○────○

──────────────────────────────────────────────────────────────────────────────
PRICING & DISCOUNTS

Hide Discount                   ○────○      Show Discount Column      ○────○
Decimals for item prices        [ 2 ▼ ]

──────────────────────────────────────────────────────────────────────────────
COMPANY & HSN/SAC

Hide HSN/SAC                    ○────○      Show Company Details      ○────●
Show HSN/SAC Summary            ○────○      Show Summary On [ +10 ▼ ]

──────────────────────────────────────────────────────────────────────────────
LAYOUT & FONTS

Language              [ English ▼ ]
Font Style            [ Stylish ▼ ]

PDF Font Size

( ) Small   (●) Normal   ( ) Large

──────────────────────────────────────────────────────────────────────────────
PAGE SETUP

Orientation           [ Portrait ▼ ]
Repeat Header         ○────○

──────────────────────────────────────────────────────────────────────────────
TABLE & CONTENT

Enable Item Headers   ○────○
Show Full Page        ○────○
Show Striped Rows     ○────○

──────────────────────────────────────────────────────────────────────────────
MARGINS

Top [0] Bottom [0]
Left [24] Right [24]

──────────────────────────────────────────────────────────────────────────────
EXPORT

Show Conversion Factor    ○────○
Show in INR               ○────○

──────────────────────────────────────────────────────────────────────────────
BRANDING

Accent Color      [■]
Hex Color         [ #276EF1 ]
Watermark         [ Preview ]

──────────────────────────────────────────────────────────────────────────────
FOOTER

PDF Footer

┌────────────────────────────────────────────────────────────┐
│ Swipe | Simple Invoicing...                               │
└────────────────────────────────────────────────────────────┘

Thermal Print Footer

┌────────────────────────────────────────────────────────────┐
│ Powered by Swipe POS...                                   │
└────────────────────────────────────────────────────────────┘

──────────────────────────────────────────────────────────────────────────────
HEADER & FOOTER IMAGES

Header Upload                  Footer Upload

──────────────────────────────────────────────────────────────────────────────
BANNER IMAGES

Banner Top Upload              Banner Bottom Upload

──────────────────────────────────────────────────────────────────────────────

[ Save changes ]   [ Cancel ]
```

This settings drawer is a **well-structured enterprise configuration panel**, using a **single scrollable column of cards** with a **predominantly two-column grid** inside each section, allowing users to configure every aspect of invoice PDF generation without leaving the invoice creation screen.

# UI Layout Analysis – Sales (Invoice Listing Page)

> **Context:** This is the **Sales** dashboard/listing page in Swipe. It serves as the central screen for managing invoices before opening the **Create Invoice** page. The **Document Settings** button opens the slide-over drawer analyzed previously.

---

# 1. Page Overview

### Page Title

**Sales**

### Purpose

Display, search, filter, manage, and perform actions on sales invoices. It also provides quick access to invoice creation, document settings, reports, and additional business services.

### Page Type

* Dashboard
* Data Listing Page
* Master-Detail Navigation
* Invoice Management

### Total Major Sections

1. Global Header
2. Left Sidebar Navigation
3. Subscription Banner
4. Sales Header
5. Status Tabs
6. Search & Filters
7. Sales Data Table
8. Summary Cards
9. Pagination
10. Promotional Service Cards
11. Footer
12. Floating WhatsApp Button

**Total: 12 Sections**

---

# 2. Section-wise Analysis

---

# Section 1 – Global Header

### Purpose

Application branding, company selection, global search, and utility actions.

### Row 1 (5 Columns)

| Column | Label                                         | Type                        |
| ------ | --------------------------------------------- | --------------------------- |
| 1      | swipe                                         | Logo                        |
| 2      | MARUF DRESSES                                 | Company Selector            |
| 3      | How to remove Swipe branding from my invoice? | Global Search               |
| 4      | ctrl+k                                        | Keyboard Shortcut Indicator |
| 5      | Utility Icons                                 | Icon Buttons                |

### Utility Icons

* Lightning
* Notification
* Megaphone
* User Profile

---

# Section 2 – Left Sidebar Navigation

### Sales (Expanded)

Submenu

* Invoices
* Credit Notes
* E-Invoices
* Subscriptions

---

### Main Navigation

* Purchases
* Quotations+
* Expenses+
* SwipeAI
* Products & Services
* Inventory
* Invite Users
* Settings

---

### Bottom Card

Refer a friend & Get ₹2000 🥳

Button

Refer Now 🚀

---

# Section 3 – Subscription Banner

Centered banner.

Text

Get GSTR-1, Sales, P&L and 40+ Reports

Button

Subscribe Now 🚀

---

# Section 4 – Sales Header

### Row 1 (3 Columns)

| Column | Control           |
| ------ | ----------------- |
| 1      | Sales             |
| 2      | Document Settings |
| 3      | + Create Invoice  |

---

# Section 5 – Status Tabs

Horizontal navigation.

Tabs

* All
* Pending
* Paid
* Cancelled
* Drafts

Visible Badge

All

1

Active Tab

All

---

# Section 6 – Search & Filters

### Row 1 (4 Columns)

| Column | Label                                           | Type         |
| ------ | ----------------------------------------------- | ------------ |
| 1      | Search by transaction, customers, invoice etc.. | Search Input |
| 2      | This Year                                       | Dropdown     |
| 3      | Actions                                         | Dropdown     |
| 4      | Filter Icon                                     | Icon Button  |

Placeholder

Search by transaction, customers, invoice etc..

Default

This Year

---

# Section 7 – Sales Table

## Headers

| Column   |
| -------- |
| Amount   |
| Status   |
| Mode     |
| Bill #   |
| Customer |
| Date     |

Each of the first four columns has:

* Sort Icon
* Filter Icon

Date column has

* Sort Icon

---

## Visible Row

### Amount

₹180.00

---

### Status

paid

Badge

Green

---

### Mode

Cash

Badge

Green

Additional Text

+1

---

### Bill

INV-157

Subtext

by Chandan

---

### Customer

SATYAM LIFESTYLE

Subtext

+919668223676

---

### Date

21 Jul 2026

Subtext

Yesterday, 6:0...

---

### Actions

View

Send

More (•••)

---

# Section 8 – Summary Cards

Three statistic chips.

### Row 1 (3 Columns)

| Card          |
| ------------- |
| Total ₹180.00 |
| Paid ₹180.00  |
| Pending ₹0.00 |

---

# Section 9 – Pagination

Right aligned

Current Page

1/1

Buttons

* Previous
* Next

---

# Section 10 – Promotional Cards

Three equal-width cards.

---

## Card 1

Bulk Upload Invoices

Description

Upload invoices at once from Excel or CSV files.

Button

Talk to Specialist →

---

## Card 2

Tally Integration

Description

Automatically sync your Swipe data with Tally.

Button

Talk to Specialist →

---

## Card 3

E-Way Bills

Description

Generate and manage e-way bills effortlessly.

Button

Talk to Specialist →

---

# Section 11 – Footer

Logo

swipe

Text

©2026 NextSpeed Technologies Private Limited. All rights reserved.

Security Link

Data is secured via 'bank-grade' security

---

# Section 12 – Floating Button

WhatsApp Floating Action Button

Bottom Right

---

# 3. Buttons & Actions

| Button               | Type       | Position          | Alignment |
| -------------------- | ---------- | ----------------- | --------- |
| Document Settings    | Secondary  | Sales Header      | Right     |
| + Create Invoice     | Primary    | Sales Header      | Right     |
| Subscribe Now 🚀     | Primary    | Banner            | Center    |
| Actions              | Dropdown   | Filter Row        | Right     |
| Filter               | Icon       | Filter Row        | Right     |
| View                 | Secondary  | Table Row         | Right     |
| Send                 | Secondary  | Table Row         | Right     |
| More (•••)           | Icon Menu  | Table Row         | Right     |
| Previous             | Pagination | Bottom Right      | Right     |
| Next                 | Pagination | Bottom Right      | Right     |
| Talk to Specialist → | Secondary  | Promotional Cards | Left      |
| Refer Now 🚀         | Primary    | Sidebar Bottom    | Left      |

---

# 4. Tables

## Sales Table

### Column Headers

1. Amount
2. Status
3. Mode
4. Bill #
5. Customer
6. Date

---

### Features

| Feature          | Available |
| ---------------- | --------- |
| Search           | ✔         |
| Date Filter      | ✔         |
| Actions Dropdown | ✔         |
| Column Filter    | ✔         |
| Column Sorting   | ✔         |
| Pagination       | ✔         |
| Row Actions      | ✔         |
| Status Badges    | ✔         |
| Search Box       | ✔         |

No row selection checkbox visible.

No bulk actions visible.

---

# 5. Navigation Elements

## Sidebar

Sales

* Invoices
* Credit Notes
* E-Invoices
* Subscriptions

Purchases

Quotations+

Expenses+

SwipeAI

Products & Services

Inventory

Invite Users

Settings

---

## Page Tabs

* All
* Pending
* Paid
* Cancelled
* Drafts

---

## Header Actions

* Document Settings
* Create Invoice

---

## Global Header

* Company Selector
* Search
* Notifications
* User Profile

---

# 6. Cards, Panels & Components

Visible Components

* Sidebar Navigation
* Search Bar
* Subscription Banner
* Primary CTA
* Status Tabs
* Data Table
* Statistic Chips
* Promotional Cards
* Floating WhatsApp Button
* Dropdown Menus
* Filter Icons
* Sort Icons
* Status Badges
* Pagination
* Company Selector
* Global Search

---

# 7. Layout Structure

```text
Global Header
──────────────────────────────────────────────────────────

Left Sidebar │ Main Content
             │
             ├── Subscription Banner
             │
             ├── Sales Header
             │
             ├── Status Tabs
             │
             ├── Search & Filters
             │
             ├── Sales Table
             │
             ├── Summary Cards
             │
             ├── Pagination
             │
             ├── Promotional Cards
             │
             └── Footer
```

### Grid Structure

* **Overall Layout:** 2-column (Sidebar + Main Content)
* **Promotional Cards:** 3-column equal-width grid
* **Summary Cards:** 3-column horizontal row
* **Search Toolbar:** 4-column responsive toolbar
* **Sales Header:** 3-column layout with title on left and actions on right
* **Table:** 6 primary columns plus row action area

---

# 8. Complete Field Inventory

| Section          | Row    | Column | Label                                           | Field Type                 |
| ---------------- | ------ | ------ | ----------------------------------------------- | -------------------------- |
| Global Header    | 1      | 2      | MARUF DRESSES                                   | Company Selector           |
| Global Header    | 1      | 3      | How to remove Swipe branding from my invoice?   | Search Input               |
| Sales Header     | 1      | 2      | Document Settings                               | Button                     |
| Sales Header     | 1      | 3      | + Create Invoice                                | Primary Button             |
| Status Tabs      | 1      | 1      | All                                             | Tab                        |
| Status Tabs      | 1      | 2      | Pending                                         | Tab                        |
| Status Tabs      | 1      | 3      | Paid                                            | Tab                        |
| Status Tabs      | 1      | 4      | Cancelled                                       | Tab                        |
| Status Tabs      | 1      | 5      | Drafts                                          | Tab                        |
| Search & Filters | 1      | 1      | Search by transaction, customers, invoice etc.. | Search Input               |
| Search & Filters | 1      | 2      | This Year                                       | Dropdown                   |
| Search & Filters | 1      | 3      | Actions                                         | Dropdown                   |
| Search & Filters | 1      | 4      | Filter                                          | Icon Button                |
| Table            | Header | 1      | Amount                                          | Sortable Column            |
| Table            | Header | 2      | Status                                          | Sortable/Filterable Column |
| Table            | Header | 3      | Mode                                            | Sortable/Filterable Column |
| Table            | Header | 4      | Bill #                                          | Sortable/Filterable Column |
| Table            | Header | 5      | Customer                                        | Text Column                |
| Table            | Header | 6      | Date                                            | Sortable Column            |

---

# 9. UI Observations

### Strengths

* Clear enterprise dashboard layout with a familiar ERP pattern.
* Primary action (**+ Create Invoice**) is highly visible.
* Search, filters, and status tabs are positioned together for efficient workflow.
* Row-level actions (**View**, **Send**, **More**) reduce clutter while keeping actions accessible.
* Sidebar navigation is logically grouped by business modules.
* Promotional cards are visually separated from operational content.

### Observations

* No visible breadcrumb; navigation relies on the sidebar and page title.
* The **All** tab includes a count badge, while other tabs do not show counts.
* The table supports sorting and filtering through icons, but row selection checkboxes are not visible.
* Pagination controls remain visible even with a single page of results.
* The **Document Settings** button is placed beside **Create Invoice**, providing quick access to the settings drawer analyzed previously.
* Promotional/service cards occupy significant vertical space beneath the table, which may reduce the number of visible table rows on smaller screens.

---

# 10. Text Wireframe (ASCII Layout)

```text
────────────────────────────────────────────────────────────────────────────────────────────
swipe | MARUF DRESSES | [ How to remove Swipe branding from my invoice? ] | ⚡ 🔔 📣 👤
────────────────────────────────────────────────────────────────────────────────────────────

┌──────────── Sidebar ───────────┐  ┌──────────────────────────────────────────────────────┐
│ Sales                          │  │ Get GSTR-1, Sales, P&L and 40+ Reports [Subscribe]  │
│ ├─ Invoices                    │  ├──────────────────────────────────────────────────────┤
│ ├─ Credit Notes                │  │ Sales                          [Document Settings]   │
│ ├─ E-Invoices                  │  │                               [+ Create Invoice]     │
│ ├─ Subscriptions               │  ├──────────────────────────────────────────────────────┤
│ Purchases                      │  │ [All] [Pending] [Paid] [Cancelled] [Drafts]          │
│ Quotations+                    │  ├──────────────────────────────────────────────────────┤
│ Expenses+                      │  │ [ Search by transaction, customers, invoice etc.. ] │
│ SwipeAI                        │  │ [ This Year ▼ ]   [ Actions ▼ ]   [⚙ Filter]         │
│ Products & Services            │  ├──────────────────────────────────────────────────────┤
│ Inventory                      │  │ Amount | Status | Mode | Bill # | Customer | Date    │
│ Invite Users                   │  │ ₹180   | paid  | Cash | INV-157| SATYAM... | 21 Jul │
│ Settings                       │  │                                [View] [Send] [...]   │
│                                │  ├──────────────────────────────────────────────────────┤
│ Refer a friend & Get ₹2000     │  │ [Total ₹180] [Paid ₹180] [Pending ₹0]      1/1 ◀ ▶  │
│ [ Refer Now 🚀 ]               │  ├──────────────────────────────────────────────────────┤
└────────────────────────────────┘  │ Bulk Upload | Tally Integration | E-Way Bills        │
                                    │ [Talk to Specialist] [Talk to Specialist] [Talk...] │
                                    └──────────────────────────────────────────────────────┘

Footer: swipe | ©2026 NextSpeed Technologies Private Limited | Data is secured via 'bank-grade' security

                                                       ◉ WhatsApp Floating Button
```

This page follows a **modern SaaS ERP master-list pattern** with a persistent **left navigation**, a **top application header**, a **central invoice management workspace**, and **contextual actions** (Document Settings and Create Invoice) placed prominently for efficient invoice operations.


# UI Layout Analysis – Purchases (Purchase Listing Page)

> **Context:** This is the **Purchases** listing page of Swipe. It is the purchase-side equivalent of the Sales module, used for managing purchase invoices, vendor bills, debit notes, and related procurement records.

---

# 1. Page Overview

### Page Title

**Purchases**

### Purpose

Manage purchase invoices by searching, filtering, viewing, sending, recording payments, and creating new purchase entries. It also provides document settings and access to procurement-related services.

### Page Type

* Dashboard
* Purchase Invoice Listing
* Data Grid
* Master List View

### Total Major Sections

1. Global Header
2. Left Sidebar Navigation
3. Premium Banner
4. Purchases Header
5. Status Tabs
6. Search & Filter Toolbar
7. Purchase Table
8. Purchase Summary Cards
9. Pagination
10. Promotional Service Cards
11. Footer
12. Floating WhatsApp Button

**Total Major Sections: 12**

---

# 2. Section-wise Analysis

---

# Section 1 – Global Header

### Description

Global application header containing branding, company selector, global search, and utility actions.

### Row 1 (5 Columns)

| Column | Label                                        | Field Type                  |
| ------ | -------------------------------------------- | --------------------------- |
| 1      | swipe                                        | Logo                        |
| 2      | MARUF DRESSES                                | Company Selector            |
| 3      | How to add a payment QR code to the invoice? | Global Search               |
| 4      | ctrl+k                                       | Keyboard Shortcut Indicator |
| 5      | Utility Icons                                | Icon Buttons                |

### Utility Icons

* Lightning
* Notification
* Megaphone
* User Profile

---

# Section 2 – Left Sidebar Navigation

## Expanded Module

**Purchases**

### Submenu

* Purchases
* Purchase Orders
* Debit Notes

---

### Remaining Navigation

* Sales
* Quotations+
* Expenses+
* SwipeAI
* Products & Services
* Inventory
* Payments (partially visible)
* Invite Users
* Settings

---

### Sidebar Bottom Card

**Refer a friend & Get ₹2000 🥳**

Button

**Refer Now 🚀**

---

# Section 3 – Premium Banner

### Row 1

Text

**Create unlimited E-way bills and E-invoices on mobile & web**

Button

**Go Premium 🚀**

---

# Section 4 – Purchases Header

### Row 1 (3 Columns)

| Column | Control           | Type             |
| ------ | ----------------- | ---------------- |
| 1      | Purchases         | Page Heading     |
| 2      | Document Settings | Secondary Button |
| 3      | + Create Purchase | Primary Button   |

---

# Section 5 – Status Tabs

### Row 1

Tabs

* All
* Pending
* Paid
* Cancelled
* Drafts

Visible Badge

**All**

* **1**

Active Tab

**All**

---

# Section 6 – Search & Filter Toolbar

### Row 1 (4 Columns)

| Column | Label                                           | Field Type  |
| ------ | ----------------------------------------------- | ----------- |
| 1      | Search by transaction, customers, invoice etc.. | Search Box  |
| 2      | This Year                                       | Dropdown    |
| 3      | Actions                                         | Dropdown    |
| 4      | Filter                                          | Icon Button |

### Placeholder

**Search by transaction, customers, invoice etc..**

### Default Value

**This Year**

---

# Section 7 – Purchase Table

## Table Headers

| Column |
| ------ |
| Amount |
| Status |
| Mode   |
| Bill # |
| Vendor |
| Date   |

### Header Features

#### Amount

* Sort Icon
* Filter Icon

#### Status

* Filter Icon

#### Mode

* Filter Icon

#### Bill

* Sort Icon
* Filter Icon

#### Vendor

No filter visible.

#### Date

* Sort Icon

---

## Visible Data Row

### Column 1

Amount

**₹ 15,840.00**

---

### Column 2

Status Badge

**pending**

Subtext

**since 46 days**

Badge Color

Yellow

---

### Column 3

Mode

No payment mode displayed.

---

### Column 4

Bill #

**PINV-1**

Subtext

**by Chandan**

---

### Column 5

Vendor

**Maruf**

---

### Column 6

Date

**06 Jun**

Subtext

**11:10 AM**

---

### Row Actions

Visible Buttons

1. ₹ (Payment Button)
2. View
3. Send
4. More (•••)

---

# Section 8 – Purchase Summary Cards

### Row 1 (3 Columns)

| Card               |
| ------------------ |
| Total ₹15,840.00   |
| Paid ₹0.00         |
| Pending ₹15,840.00 |

---

# Section 9 – Pagination

Right Aligned

Current Page

**1/1**

Buttons

* Previous
* Next

---

# Section 10 – Promotional Cards

Three-column card layout.

---

## Card 1

### Heading

Bulk Upload Invoices

Description

Upload invoices at once from Excel or CSV files.

Button

Talk to Specialist →

---

## Card 2

### Heading

Tally Integration

Description

Automatically sync your Swipe data with Tally.

Button

Talk to Specialist →

---

## Card 3

### Heading

E-Way Bills

Description

Generate and manage e-way bills effortlessly.

Button

Talk to Specialist →

---

# Section 11 – Footer

Logo

**swipe**

Footer Text

**©2026 NextSpeed Technologies Private Limited. All rights reserved.**

Security Link

**Data is secured via 'bank-grade' security**

---

# Section 12 – Floating Action Button

Bottom Right

WhatsApp Floating Button

---

# 3. Buttons & Actions

| Button               | Type           | Position          | Alignment |
| -------------------- | -------------- | ----------------- | --------- |
| Go Premium 🚀        | Primary        | Banner            | Center    |
| Document Settings    | Secondary      | Page Header       | Right     |
| + Create Purchase    | Primary        | Page Header       | Right     |
| Actions              | Dropdown       | Toolbar           | Right     |
| Filter               | Icon Button    | Toolbar           | Right     |
| ₹                    | Payment Action | Table Row         | Right     |
| View                 | Secondary      | Table Row         | Right     |
| Send                 | Secondary      | Table Row         | Right     |
| More (•••)           | Icon Menu      | Table Row         | Right     |
| Previous             | Pagination     | Bottom Right      | Right     |
| Next                 | Pagination     | Bottom Right      | Right     |
| Talk to Specialist → | Secondary      | Promotional Cards | Left      |
| Refer Now 🚀         | Primary        | Sidebar Bottom    | Left      |

---

# 4. Tables

## Purchase Table

### Column Headers

1. Amount
2. Status
3. Mode
4. Bill #
5. Vendor
6. Date

### Available Features

| Feature          | Present |
| ---------------- | ------- |
| Search           | ✔       |
| Filters          | ✔       |
| Sorting          | ✔       |
| Search Box       | ✔       |
| Status Badge     | ✔       |
| Row Actions      | ✔       |
| Pagination       | ✔       |
| Dropdown Actions | ✔       |

### Not Visible

* Bulk Selection
* Row Checkbox
* Bulk Delete
* Inline Editing

---

# 5. Navigation Elements

## Sidebar Navigation

### Sales

(Collapsed)

### Purchases

Expanded

* Purchases
* Purchase Orders
* Debit Notes

### Other Modules

* Quotations+
* Expenses+
* SwipeAI
* Products & Services
* Inventory
* Payments (partially visible)
* Invite Users
* Settings

---

## Page Tabs

* All
* Pending
* Paid
* Cancelled
* Drafts

---

## Header Actions

* Document Settings
* Create Purchase

---

## Global Navigation

* Company Selector
* Global Search
* Utility Icons

---

# 6. Cards, Panels & Components

Visible Components

* Sidebar Navigation
* Global Header
* Premium Banner
* Page Header
* Status Tabs
* Search Bar
* Dropdown Filters
* Purchase Data Table
* Summary Statistic Cards
* Status Badge
* Payment Action Button
* Promotional Cards
* Pagination Controls
* Floating WhatsApp Button
* Footer
* Company Selector
* Icon Buttons

---

# 7. Layout Structure

```
Global Header
──────────────────────────────────────────────────────────────

Sidebar │ Main Content
        │
        ├── Premium Banner
        ├── Purchases Header
        ├── Status Tabs
        ├── Search & Filter Toolbar
        ├── Purchase Table
        ├── Summary Cards
        ├── Pagination
        ├── Promotional Cards
        └── Footer
```

### Grid Structure

* Overall: **2-column layout** (Sidebar + Content)
* Header: **3-column action layout**
* Toolbar: **4-column responsive grid**
* Summary: **3 equal statistic cards**
* Promotional Section: **3 equal-width cards**
* Table: **6 primary data columns + row action area**

---

# 8. Complete Field Inventory

| Section       | Row    | Column | Label                                           | Field Type                 |
| ------------- | ------ | ------ | ----------------------------------------------- | -------------------------- |
| Global Header | 1      | 2      | MARUF DRESSES                                   | Company Selector           |
| Global Header | 1      | 3      | How to add a payment QR code to the invoice?    | Search Input               |
| Page Header   | 1      | 2      | Document Settings                               | Button                     |
| Page Header   | 1      | 3      | + Create Purchase                               | Primary Button             |
| Status Tabs   | 1      | 1      | All                                             | Tab                        |
| Status Tabs   | 1      | 2      | Pending                                         | Tab                        |
| Status Tabs   | 1      | 3      | Paid                                            | Tab                        |
| Status Tabs   | 1      | 4      | Cancelled                                       | Tab                        |
| Status Tabs   | 1      | 5      | Drafts                                          | Tab                        |
| Toolbar       | 1      | 1      | Search by transaction, customers, invoice etc.. | Search Input               |
| Toolbar       | 1      | 2      | This Year                                       | Dropdown                   |
| Toolbar       | 1      | 3      | Actions                                         | Dropdown                   |
| Toolbar       | 1      | 4      | Filter                                          | Icon Button                |
| Table         | Header | 1      | Amount                                          | Sortable Column            |
| Table         | Header | 2      | Status                                          | Filterable Column          |
| Table         | Header | 3      | Mode                                            | Filterable Column          |
| Table         | Header | 4      | Bill #                                          | Sortable/Filterable Column |
| Table         | Header | 5      | Vendor                                          | Text Column                |
| Table         | Header | 6      | Date                                            | Sortable Column            |

---

# 9. UI Observations

### Strengths

* Consistent visual design with the Sales module, reducing the learning curve.
* Primary action (**+ Create Purchase**) is prominently positioned.
* Search, year filter, actions menu, and filter icon are grouped for efficient access.
* Status badges use color to distinguish payment states (yellow for pending).
* Row-level action buttons are compact and clearly separated.
* Summary cards provide a quick financial overview.

### Observations

* The **Mode** column is empty for the visible purchase row, indicating no payment mode has been recorded.
* An additional **₹** action button appears before **View**, likely representing a payment or record-payment action that is not present on the Sales listing.
* The **Vendor** column replaces the **Customer** column used in the Sales page, reflecting procurement terminology.
* The **Pending** badge includes contextual aging information (**since 46 days**), providing useful follow-up insight directly in the table.
* Sidebar shows the **Purchases** module expanded, while **Sales** is collapsed, matching the current page context.

---

# 10. Text Wireframe (ASCII Layout)

```text
────────────────────────────────────────────────────────────────────────────────────────────────────
swipe | MARUF DRESSES | [ How to add a payment QR code to the invoice? ] | ⚡ 🔔 📣 👤
────────────────────────────────────────────────────────────────────────────────────────────────────

┌──────────── Sidebar ───────────┐  ┌──────────────────────────────────────────────────────────────┐
│ Sales                          │  │ Create unlimited E-way bills and E-invoices... [Go Premium] │
│ Purchases ▼                    │  ├──────────────────────────────────────────────────────────────┤
│ ├─ Purchases                   │  │ Purchases                     [Document Settings]            │
│ ├─ Purchase Orders             │  │                             [+ Create Purchase]              │
│ ├─ Debit Notes                 │  ├──────────────────────────────────────────────────────────────┤
│ Quotations+                    │  │ [All] [Pending] [Paid] [Cancelled] [Drafts]                 │
│ Expenses+                      │  ├──────────────────────────────────────────────────────────────┤
│ SwipeAI                        │  │ [ Search by transaction, customers, invoice etc.. ]         │
│ Products & Services            │  │ [ This Year ▼ ] [ Actions ▼ ] [ Filter ]                    │
│ Inventory                      │  ├──────────────────────────────────────────────────────────────┤
│ Payments                       │  │ Amount | Status | Mode | Bill # | Vendor | Date             │
│ Invite Users                   │  │ ₹15,840 | pending | — | PINV-1 | Maruf | 06 Jun             │
│ Settings                       │  │                         [₹] [View] [Send] [...]             │
│                                │  ├──────────────────────────────────────────────────────────────┤
│ Refer a friend & Get ₹2000     │  │ [Total ₹15,840] [Paid ₹0] [Pending ₹15,840]      1/1 ◀ ▶   │
│ [ Refer Now 🚀 ]               │  ├──────────────────────────────────────────────────────────────┤
└────────────────────────────────┘  │ Bulk Upload | Tally Integration | E-Way Bills               │
                                    │ [Talk to Specialist] [Talk to Specialist] [Talk...]        │
                                    └──────────────────────────────────────────────────────────────┘

Footer: swipe | ©2026 NextSpeed Technologies Private Limited | Data is secured via 'bank-grade' security

                                                        ● WhatsApp Floating Action Button
```

This page mirrors the overall **Sales module architecture**, but adapts it for procurement workflows by replacing customer-centric information with vendor-centric data, introducing a payment action in each row, and displaying aging information for pending purchase invoices while maintaining the same enterprise dashboard structure.


# UI Layout Analysis – Purchase Returns / Debit Notes Listing Page

> **Context:** This page belongs to the **Purchases** module and lists **Purchase Returns / Debit Notes**. In the provided screenshot, the page is in an **empty state**, indicating that no purchase return or debit note records are available for the selected period.

---

# 1. Page Overview

### Page Title

**Purchase Returns / Debit Notes** *(inferred from the empty-state message; the page header is cropped out and not visible in this image)*

### Purpose

Manage purchase return transactions and debit notes. Users can search, filter, view, and create purchase return/debit note records.

### Page Type

* Data Listing Page
* Empty State Dashboard
* Master List View

### Total Major Sections

1. Left Sidebar Navigation
2. Search & Filter Toolbar *(partially visible)*
3. Purchase Return Table Header
4. Empty State Content
5. Summary Cards
6. Pagination
7. Footer
8. Floating WhatsApp Button

**Total Visible Sections: 8**

---

# 2. Section-wise Analysis

---

# Section 1 – Left Sidebar Navigation

### Description

Application navigation panel.

### Visible Navigation Items

* Expenses+
* SwipeAI
* Products & Services
* Inventory
* Invite Users
* Settings

### Promotional Card

**Refer a friend & Get ₹2000 🥳**

Button

**Refer Now 🚀**

---

# Section 2 – Search & Filter Toolbar (Top Portion Visible)

### Row 1 (4 Columns)

| Column | Label                                           | Field Type     |
| ------ | ----------------------------------------------- | -------------- |
| 1      | Search by transaction, customers, invoice etc.. | Search Textbox |
| 2      | This Year                                       | Dropdown       |
| 3      | Actions                                         | Dropdown       |
| 4      | Filter                                          | Icon Button    |

### Placeholder

**Search by transaction, customers, invoice etc..**

### Default Value

**This Year**

---

# Section 3 – Purchase Return Table Header

### Row 1 (6 Columns)

| Column | Label  | Field Type                   |
| ------ | ------ | ---------------------------- |
| 1      | Amount | Sortable Column              |
| 2      | Status | Filterable Column            |
| 3      | Mode   | Filterable Column            |
| 4      | Bill # | Sortable / Filterable Column |
| 5      | Vendor | Text Column                  |
| 6      | Date   | Sortable Column              |

### Header Features

#### Amount

* Sort Icon
* Filter Icon

#### Status

* Filter Icon

#### Mode

* Filter Icon

#### Bill

* Sort Icon
* Filter Icon

#### Vendor

No filter visible.

#### Date

* Sort Icon
* Sub-label: **Created time**

---

# Section 4 – Empty State

## Empty State Block 1

### Center Message

**Oops 😳 ! No purchase return / debit notes found.**

Subtext

**Please select different dates or create a new Purchase Return / Debit Note**

Visible Links

* dates
* Purchase Return / Debit Note

---

## Empty State Block 2

The same message appears a second time lower on the page.

**Visible Text**

**Oops 😳 ! No purchase return / debit notes found.**

Subtext

**Please select different dates or create a new Purchase Return / Debit Note**

---

# Section 5 – Summary Cards

### Row 1 (3 Columns)

| Card    | Value |
| ------- | ----- |
| Total   | ₹0.00 |
| Paid    | ₹0.00 |
| Pending | ₹0.00 |

---

# Section 6 – Pagination

Right aligned

Current Page

**1/1**

Buttons

* Previous
* Next

Both appear disabled due to only one page.

---

# Section 7 – Footer

Logo

**swipe**

Footer Text

**©2026 NextSpeed Technologies Private Limited. All rights reserved.**

Security Link

**Data is secured via 'bank-grade' security**

---

# Section 8 – Floating Action Button

Bottom-right corner

WhatsApp Floating Button

---

# 3. Buttons & Actions

| Button / Action              | Type                   | Position     | Alignment |
| ---------------------------- | ---------------------- | ------------ | --------- |
| Actions                      | Dropdown               | Top Toolbar  | Right     |
| Filter                       | Icon Button            | Top Toolbar  | Right     |
| Refer Now 🚀                 | Primary                | Sidebar      | Left      |
| dates                        | Inline Link            | Empty State  | Center    |
| Purchase Return / Debit Note | Inline Link            | Empty State  | Center    |
| Previous                     | Pagination             | Bottom Right | Right     |
| Next                         | Pagination             | Bottom Right | Right     |
| WhatsApp                     | Floating Action Button | Bottom Right | Floating  |

---

# 4. Tables

## Purchase Return Listing Table

### Column Headers

1. Amount
2. Status
3. Mode
4. Bill #
5. Vendor
6. Date

### Available Features

| Feature         | Available |
| --------------- | --------- |
| Search          | ✔         |
| Dropdown Filter | ✔         |
| Column Sorting  | ✔         |
| Column Filters  | ✔         |
| Pagination      | ✔         |
| Empty State     | ✔         |

### Not Visible

* Data Rows
* Row Selection
* Bulk Actions
* Status Badges
* Row Actions

---

# 5. Navigation Elements

## Sidebar Navigation

Visible Items

* Expenses+
* SwipeAI
* Products & Services
* Inventory
* Invite Users
* Settings

---

## Toolbar Navigation

* Search
* Year Filter
* Actions Dropdown
* Filter Button

---

## Inline Navigation

Within the empty state:

* dates
* Purchase Return / Debit Note

---

# 6. Cards, Panels & Components

Visible Components

* Sidebar Navigation
* Search Box
* Dropdown
* Filter Button
* Table Header
* Empty State Panel
* Summary Cards
* Pagination
* Promotional Referral Card
* Floating WhatsApp Button
* Footer
* Sort Icons
* Filter Icons
* Hyperlinks

---

# 7. Layout Structure

```text
Overall Layout

┌──────── Sidebar ────────┬─────────────────────────────────────────────┐
│                         │ Search Toolbar                              │
│                         │─────────────────────────────────────────────│
│                         │ Table Header                               │
│                         │─────────────────────────────────────────────│
│                         │                                             │
│                         │         Empty State Message                 │
│                         │                                             │
│                         │─────────────────────────────────────────────│
│                         │ Summary Cards                              │
│                         │ Pagination                                 │
│                         │─────────────────────────────────────────────│
│                         │ Footer                                     │
└─────────────────────────┴─────────────────────────────────────────────┘
```

### Grid Layout

* **Overall:** 2-column layout (Sidebar + Main Content)
* **Toolbar:** 4-column horizontal controls
* **Table:** 6-column header
* **Summary:** 3-column statistic cards
* **Footer:** Full-width horizontal layout

---

# 8. Complete Field Inventory

| Section | Row    | Column | Label                                           | Field Type                   |
| ------- | ------ | ------ | ----------------------------------------------- | ---------------------------- |
| Toolbar | 1      | 1      | Search by transaction, customers, invoice etc.. | Search Textbox               |
| Toolbar | 1      | 2      | This Year                                       | Dropdown                     |
| Toolbar | 1      | 3      | Actions                                         | Dropdown                     |
| Toolbar | 1      | 4      | Filter                                          | Icon Button                  |
| Table   | Header | 1      | Amount                                          | Sortable Column              |
| Table   | Header | 2      | Status                                          | Filterable Column            |
| Table   | Header | 3      | Mode                                            | Filterable Column            |
| Table   | Header | 4      | Bill #                                          | Sortable / Filterable Column |
| Table   | Header | 5      | Vendor                                          | Text Column                  |
| Table   | Header | 6      | Date                                            | Sortable Column              |

---

# 9. UI Observations

### Strengths

* Clear empty-state messaging explaining why no data is displayed.
* Actionable guidance encourages the user to either change the selected date range or create a new Purchase Return / Debit Note.
* Summary cards remain visible even when there is no data, providing consistent layout and quick financial status.
* Pagination remains in a consistent location, preserving page structure.

### Observations

* **Duplicate empty-state message:** The same "Oops 😳 ! No purchase return / debit notes found." block appears twice in the content area. This appears redundant and may indicate either:

  * two stacked empty-state containers, or
  * a rendering/layout issue.
* The page header containing the title and primary action (e.g., **Create Purchase Return**) is not visible in this cropped screenshot, so it cannot be confirmed.
* Previous/Next pagination controls appear disabled because only one page exists.
* No row-level actions are visible because the table contains no records.

---

# 10. Text Wireframe (ASCII Layout)

```text
────────────────────────────────────────────────────────────────────────────────────────────
Sidebar                                      Purchase Return / Debit Notes
────────────────────────────────────────────────────────────────────────────────────────────

[ Search by transaction, customers, invoice etc.. ] [ This Year ▼ ] [ Actions ▼ ] [⚙]

────────────────────────────────────────────────────────────────────────────────────────────

Amount │ Status │ Mode │ Bill # │ Vendor │ Date
────────────────────────────────────────────────────────────────────────────────────────────


                     Oops 😳 ! No purchase return / debit notes found.

          Please select different dates or create a new

               dates      Purchase Return / Debit Note


────────────────────────────────────────────────────────────────────────────────────────────

                     Oops 😳 ! No purchase return / debit notes found.

          Please select different dates or create a new

               dates      Purchase Return / Debit Note

────────────────────────────────────────────────────────────────────────────────────────────

[ Total ₹0.00 ]   [ Paid ₹0.00 ]   [ Pending ₹0.00 ]

                                                      1 / 1    ◀   ▶

────────────────────────────────────────────────────────────────────────────────────────────

swipe

©2026 NextSpeed Technologies Private Limited. All rights reserved.
🔒 Data is secured via 'bank-grade' security

                                                     ● WhatsApp
```

## Notable Difference from the Purchases Listing

Compared with the populated **Purchases** page:

* The **table structure and filters remain identical**.
* **No transaction rows** are displayed.
* The page shows an **empty-state illustration/message** instead of records.
* The **summary cards** all display **₹0.00**.
* A **duplicate empty-state message** is visible, which may represent a UI rendering issue or duplicated placeholder content.


# UI Layout Analysis – Sales Returns / Credit Notes Listing Page

> **Context:** This page belongs to the **Sales** module and manages **Sales Returns / Credit Notes**. The screenshot shows an **empty state**, indicating there are currently no sales return or credit note records for the selected period.

---

# 1. Page Overview

### Page Title

**Sales Returns / Credit Notes**

### Purpose

Manage sales return transactions and credit notes. Users can search, filter, create, view, and manage sales return/credit note documents.

### Page Type

* Master Listing Page
* Data Grid
* Empty State Dashboard
* Sales Returns Management

### Total Major Sections

1. Global Header
2. Left Sidebar Navigation
3. Subscription Banner
4. Page Header
5. Status Tabs
6. Search & Filter Toolbar
7. Sales Returns Table
8. Empty State
9. Summary Cards
10. Pagination
11. Footer
12. Floating WhatsApp Button

**Total Sections: 12**

---

# 2. Section-wise Analysis

---

# Section 1 – Global Header

### Description

Application-wide navigation bar.

### Row 1 (5 Columns)

| Column | Label         | Field Type         |
| ------ | ------------- | ------------------ |
| 1      | swipe         | Logo               |
| 2      | MARUF DRESSES | Company Selector   |
| 3      | Ask SwipeAI   | Global Search      |
| 4      | ctrl+k        | Shortcut Indicator |
| 5      | Utility Icons | Icon Buttons       |

### Utility Icons

* Lightning
* Notification
* Megaphone
* User Profile

---

# Section 2 – Left Sidebar Navigation

## Expanded Module

### Sales

Submenu

* Invoices
* **Credit Notes** *(Active)*
* E-Invoices
* Subscriptions

---

### Other Modules

* Purchases
* Quotations+
* Expenses+
* SwipeAI
* Products & Services
* Inventory
* Invite Users
* Settings

---

### Sidebar Promotional Card

Heading

**Refer a friend & Get ₹2000 🥳**

Button

**Refer Now 🚀**

---

# Section 3 – Subscription Banner

### Row 1

Text

**Enjoy 15+ Templates, Remove Watermark & more**

Button

**Subscribe Now 🚀**

---

# Section 4 – Page Header

### Row 1 (3 Columns)

| Column | Control                           | Type             |
| ------ | --------------------------------- | ---------------- |
| 1      | Sales Returns / Credit Notes      | Page Heading     |
| 2      | Document Settings                 | Secondary Button |
| 3      | + Create Sales Return/Credit Note | Primary Button   |

---

# Section 5 – Status Tabs

### Row 1

Tabs

* All
* Pending
* Paid
* Cancelled
* Drafts

Visible Badge

**All**

* **1**

Active Tab

**All**

---

# Section 6 – Search & Filter Toolbar

### Row 1 (4 Columns)

| Column | Label                                           | Type           |
| ------ | ----------------------------------------------- | -------------- |
| 1      | Search by transaction, customers, invoice etc.. | Search Textbox |
| 2      | This Year                                       | Dropdown       |
| 3      | Actions                                         | Dropdown       |
| 4      | Filter                                          | Icon Button    |

### Placeholder

**Search by transaction, customers, invoice etc..**

### Default Value

**This Year**

---

# Section 7 – Sales Returns Table

## Table Headers

| Column   |
| -------- |
| Amount   |
| Status   |
| Mode     |
| Bill #   |
| Customer |
| Date     |

### Header Features

#### Amount

* Sort Icon
* Filter Icon

#### Status

* Filter Icon

#### Mode

* Filter Icon

#### Bill

* Sort Icon
* Filter Icon

#### Customer

Text column

#### Date

* Sort Icon
* Sub-label **Created time**

---

### Table Body

No records are visible.

---

# Section 8 – Empty State

Centered illustration/message.

### Main Message

**Oops 😳 ! No sales return / credit notes found.**

### Supporting Message

**Please select different dates or create a new Sales Return / Credit Note**

### Inline Links

* dates
* Sales Return / Credit Note

---

# Section 9 – Summary Cards

### Row 1 (3 Columns)

| Card    | Value |
| ------- | ----- |
| Total   | ₹0.00 |
| Paid    | ₹0.00 |
| Pending | ₹0.00 |

---

# Section 10 – Pagination

Right aligned.

Current Page

**1/1**

Controls

* Previous
* Next

Both appear disabled.

---

# Section 11 – Footer

Logo

**swipe**

Footer Text

**©2026 NextSpeed Technologies Private Limited. All rights reserved.**

Security Link

**Data is secured via 'bank-grade' security**

---

# Section 12 – Floating Action Button

Bottom-right

WhatsApp Floating Button

---

# 3. Buttons & Actions

| Button                            | Type                   | Position     | Alignment |
| --------------------------------- | ---------------------- | ------------ | --------- |
| Subscribe Now 🚀                  | Primary                | Banner       | Center    |
| Document Settings                 | Secondary              | Page Header  | Right     |
| + Create Sales Return/Credit Note | Primary                | Page Header  | Right     |
| Actions                           | Dropdown               | Toolbar      | Right     |
| Filter                            | Icon Button            | Toolbar      | Right     |
| Refer Now 🚀                      | Primary                | Sidebar      | Left      |
| dates                             | Inline Link            | Empty State  | Center    |
| Sales Return / Credit Note        | Inline Link            | Empty State  | Center    |
| Previous                          | Pagination             | Bottom Right | Right     |
| Next                              | Pagination             | Bottom Right | Right     |
| WhatsApp                          | Floating Action Button | Bottom Right | Floating  |

---

# 4. Tables

## Sales Returns Table

### Table Headers

1. Amount
2. Status
3. Mode
4. Bill #
5. Customer
6. Date

### Available Features

| Feature          | Present |
| ---------------- | ------- |
| Search           | ✔       |
| Column Sorting   | ✔       |
| Column Filters   | ✔       |
| Actions Dropdown | ✔       |
| Empty State      | ✔       |
| Pagination       | ✔       |

### Not Visible

* Row Selection
* Bulk Actions
* Status Badges
* Row Actions
* Data Rows

---

# 5. Navigation Elements

## Sidebar

### Sales (Expanded)

* Invoices
* **Credit Notes** *(Active)*
* E-Invoices
* Subscriptions

### Other Modules

* Purchases
* Quotations+
* Expenses+
* SwipeAI
* Products & Services
* Inventory
* Invite Users
* Settings

---

## Status Tabs

* All
* Pending
* Paid
* Cancelled
* Drafts

---

## Header Actions

* Document Settings
* Create Sales Return/Credit Note

---

## Toolbar

* Search
* This Year
* Actions
* Filter

---

# 6. Cards, Panels & Components

Visible Components

* Sidebar Navigation
* Global Header
* Promotional Banner
* Page Header
* Status Tabs
* Search Box
* Dropdown Filters
* Data Grid Header
* Empty State
* Statistic Cards
* Pagination
* Floating WhatsApp Button
* Footer
* Sort Icons
* Filter Icons
* Inline Hyperlinks

---

# 7. Layout Structure

```text
Global Header
────────────────────────────────────────────────────────────────────────────

Sidebar │ Main Content
        │
        ├── Subscription Banner
        ├── Page Header
        ├── Status Tabs
        ├── Search & Filter Toolbar
        ├── Sales Returns Table
        ├── Empty State
        ├── Horizontal Scrollbar
        ├── Summary Cards
        ├── Pagination
        └── Footer
```

### Grid Layout

* **Overall:** 2-column layout (Sidebar + Main Content)
* **Page Header:** 3-column layout
* **Toolbar:** 4-column horizontal controls
* **Table:** 6-column grid
* **Summary:** 3 statistic cards
* **Footer:** Full-width

---

# 8. Complete Field Inventory

| Section       | Row    | Column | Label                                           | Field Type                   |
| ------------- | ------ | ------ | ----------------------------------------------- | ---------------------------- |
| Global Header | 1      | 2      | MARUF DRESSES                                   | Company Selector             |
| Global Header | 1      | 3      | Ask SwipeAI                                     | Global Search                |
| Page Header   | 1      | 2      | Document Settings                               | Button                       |
| Page Header   | 1      | 3      | + Create Sales Return/Credit Note               | Primary Button               |
| Status Tabs   | 1      | 1      | All                                             | Tab                          |
| Status Tabs   | 1      | 2      | Pending                                         | Tab                          |
| Status Tabs   | 1      | 3      | Paid                                            | Tab                          |
| Status Tabs   | 1      | 4      | Cancelled                                       | Tab                          |
| Status Tabs   | 1      | 5      | Drafts                                          | Tab                          |
| Toolbar       | 1      | 1      | Search by transaction, customers, invoice etc.. | Search Textbox               |
| Toolbar       | 1      | 2      | This Year                                       | Dropdown                     |
| Toolbar       | 1      | 3      | Actions                                         | Dropdown                     |
| Toolbar       | 1      | 4      | Filter                                          | Icon Button                  |
| Table         | Header | 1      | Amount                                          | Sortable Column              |
| Table         | Header | 2      | Status                                          | Filterable Column            |
| Table         | Header | 3      | Mode                                            | Filterable Column            |
| Table         | Header | 4      | Bill #                                          | Sortable / Filterable Column |
| Table         | Header | 5      | Customer                                        | Text Column                  |
| Table         | Header | 6      | Date                                            | Sortable Column              |

---

# 9. UI Observations

### Strengths

* Consistent layout with the Sales invoice listing, maintaining a familiar workflow.
* Empty-state messaging clearly explains the absence of records and suggests corrective actions.
* Primary CTA (**+ Create Sales Return/Credit Note**) is highly visible.
* Summary cards remain visible even when there are no records.
* Search and filtering controls are positioned above the table for efficient discovery.

### Observations

* Unlike the earlier Purchase Returns screenshot, **only one empty-state message** is displayed here, resulting in a cleaner layout.
* A **horizontal scrollbar** is visible beneath the empty table, indicating the table supports horizontal scrolling for narrower viewports or additional columns.
* Pagination controls are disabled because only one page exists.
* No data rows, row actions, or status badges are present due to the empty dataset.
* The sidebar correctly highlights **Credit Notes** under the **Sales** module, reflecting the current context.

---

# 10. Text Wireframe (ASCII Layout)

```text
────────────────────────────────────────────────────────────────────────────────────────────────────────
swipe | MARUF DRESSES | [ Ask SwipeAI ] | ctrl+k | ⚡ 🔔 📣 👤
────────────────────────────────────────────────────────────────────────────────────────────────────────

┌──────────── Sidebar ─────────────┐  ┌─────────────────────────────────────────────────────────────────┐
│ Sales ▼                         │  │ Enjoy 15+ Templates, Remove Watermark & more [Subscribe Now]    │
│ ├─ Invoices                     │  ├─────────────────────────────────────────────────────────────────┤
│ ├─ Credit Notes ●               │  │ Sales Returns / Credit Notes                                    │
│ ├─ E-Invoices                   │  │                     [Document Settings] [+ Create Sales Return] │
│ ├─ Subscriptions                │  ├─────────────────────────────────────────────────────────────────┤
│ Purchases                       │  │ [All] [Pending] [Paid] [Cancelled] [Drafts]                    │
│ Quotations+                     │  ├─────────────────────────────────────────────────────────────────┤
│ Expenses+                       │  │ [ Search by transaction, customers, invoice etc.. ]            │
│ SwipeAI                         │  │ [ This Year ▼ ] [ Actions ▼ ] [⚙ Filter]                       │
│ Products & Services             │  ├─────────────────────────────────────────────────────────────────┤
│ Inventory                       │  │ Amount | Status | Mode | Bill # | Customer | Date              │
│ Invite Users                    │  │─────────────────────────────────────────────────────────────────│
│ Settings                        │  │                                                                 │
│                                 │  │        Oops 😳 ! No sales return / credit notes found.         │
│ Refer a friend & Get ₹2000      │  │ Please select different dates or create a new                  │
│ [ Refer Now 🚀 ]                │  │        dates | Sales Return / Credit Note                      │
└─────────────────────────────────┘  ├─────────────────────────────────────────────────────────────────┤
                                     │ ───────────────── Horizontal Scrollbar ─────────────────────── │
                                     ├─────────────────────────────────────────────────────────────────┤
                                     │ [ Total ₹0.00 ] [ Paid ₹0.00 ] [ Pending ₹0.00 ]      1/1 ◀ ▶ │
                                     └─────────────────────────────────────────────────────────────────┘

Footer:
swipe | ©2026 NextSpeed Technologies Private Limited. All rights reserved.
🔒 Data is secured via 'bank-grade' security

                                                          ● WhatsApp Floating Button
```

## Comparison with Related Listing Pages

| Feature              | Sales            | Purchases           | Purchase Returns                 | Sales Returns / Credit Notes    |
| -------------------- | ---------------- | ------------------- | -------------------------------- | ------------------------------- |
| Primary Entity       | Customer         | Vendor              | Vendor                           | Customer                        |
| Primary CTA          | Create Invoice   | Create Purchase     | *(Not visible in provided crop)* | Create Sales Return/Credit Note |
| Empty State          | No               | No                  | Yes                              | Yes                             |
| Summary Cards        | ✔                | ✔                   | ✔                                | ✔                               |
| Document Settings    | ✔                | ✔                   | *(Not visible in provided crop)* | ✔                               |
| Row Actions          | View, Send, More | ₹, View, Send, More | None                             | None                            |
| Horizontal Scrollbar | Not visible      | Not visible         | Not visible                      | ✔                               |


# UI Layout Analysis – Purchase Returns / Debit Notes Listing Page

> **Context:** This is the **Purchase Returns / Debit Notes** page under the **Purchases** module. Unlike the previous cropped image, this screenshot shows the **complete page**, including the page header, toolbar, sidebar navigation, primary actions, and empty-state message.

---

# 1. Page Overview

### Page Title

**Purchase Returns / Debit Notes**

### Purpose

Manage purchase return transactions and supplier debit notes. Users can:

* Search purchase returns
* Filter by status and period
* Create new Purchase Returns / Debit Notes
* Configure document settings
* View financial summaries
* Manage purchase return records

### Page Type

* Master Listing Page
* Data Grid
* Empty State Dashboard
* Purchase Return Management

### Total Major Sections

1. Global Header
2. Left Sidebar Navigation
3. Subscription Banner
4. Page Header
5. Status Tabs
6. Search & Filter Toolbar
7. Purchase Returns Table
8. Empty State Panel
9. Horizontal Scroll Area
10. Summary Cards
11. Pagination
12. Footer
13. Floating WhatsApp Button

**Total Sections: 13**

---

# 2. Section-wise Analysis

---

# Section 1 – Global Header

### Description

Application-wide navigation bar.

### Row 1 (5 Columns)

| Column | Label         | Field Type       |
| ------ | ------------- | ---------------- |
| 1      | swipe         | Logo             |
| 2      | MARUF DRESSES | Company Selector |
| 3      | Ask SwipeAI   | Global Search    |
| 4      | ctrl+k        | Shortcut Hint    |
| 5      | Utility Icons | Icon Buttons     |

### Utility Icons

* Lightning
* Notification
* Announcement
* User Profile

---

# Section 2 – Left Sidebar Navigation

## Expanded Module

### Purchases

Submenu

* Purchases
* Purchase Orders
* **Debit Notes** *(Active)*

---

### Other Modules

* Sales
* Quotations+
* Expenses+
* SwipeAI
* Products & Services
* Inventory
* Payments *(partially visible)*
* Invite Users
* Settings

---

### Sidebar Promotional Card

Heading

**Refer a friend & Get ₹2000 🥳**

Button

**Refer Now 🚀**

---

# Section 3 – Subscription Banner

### Row 1

Text

**Get GSTR-1, Sales, P&L and 40+ Reports**

Button

**Subscribe Now 🚀**

---

# Section 4 – Page Header

### Row 1 (3 Columns)

| Column | Control                             | Type             |
| ------ | ----------------------------------- | ---------------- |
| 1      | Purchase Returns / Debit Notes      | Page Heading     |
| 2      | Document Settings                   | Secondary Button |
| 3      | + Create Purchase Return/Debit Note | Primary Button   |

---

# Section 5 – Status Tabs

### Row 1

Tabs

* All
* Pending
* Paid
* Cancelled
* Drafts

### Active Tab

**All**

### Visible Badge

**1**

---

# Section 6 – Search & Filter Toolbar

### Row 1 (4 Columns)

| Column | Label                                           | Type           |
| ------ | ----------------------------------------------- | -------------- |
| 1      | Search by transaction, customers, invoice etc.. | Search Textbox |
| 2      | This Year                                       | Dropdown       |
| 3      | Actions                                         | Dropdown       |
| 4      | Filter                                          | Icon Button    |

### Placeholder

**Search by transaction, customers, invoice etc..**

### Default

**This Year**

---

# Section 7 – Purchase Returns Table

## Table Header

| Column |
| ------ |
| Amount |
| Status |
| Mode   |
| Bill # |
| Vendor |
| Date   |

### Header Controls

#### Amount

* Sort
* Filter

#### Status

* Filter

#### Mode

* Filter

#### Bill

* Sort
* Filter

#### Vendor

Text column

#### Date

* Sort
* Created time

---

### Table Body

No rows are displayed.

---

# Section 8 – Empty State

Centered empty-state component.

### Primary Message

**Oops 😳 ! No purchase return / debit notes found.**

### Secondary Message

**Please select different dates or create a new Purchase Return / Debit Note**

### Clickable Links

* dates
* Purchase Return / Debit Note

---

# Section 9 – Horizontal Scroll Area

A horizontal scrollbar is visible below the empty table area.

This indicates the table supports horizontal scrolling when additional columns or reduced viewport widths are present.

---

# Section 10 – Summary Cards

### Row 1 (3 Columns)

| Card    | Value |
| ------- | ----- |
| Total   | ₹0.00 |
| Paid    | ₹0.00 |
| Pending | ₹0.00 |

---

# Section 11 – Pagination

Right aligned.

### Current Page

**1/1**

### Controls

* Previous
* Next

Both controls appear disabled.

---

# Section 12 – Footer

Logo

**swipe**

Footer Text

**©2026 NextSpeed Technologies Private Limited. All rights reserved.**

Security Link

**Data is secured via 'bank-grade' security**

---

# Section 13 – Floating Action Button

Bottom-right

WhatsApp Floating Button

---

# 3. Buttons & Actions

| Button                              | Type                   | Position            | Alignment |
| ----------------------------------- | ---------------------- | ------------------- | --------- |
| Subscribe Now 🚀                    | Primary                | Subscription Banner | Center    |
| Document Settings                   | Secondary              | Page Header         | Right     |
| + Create Purchase Return/Debit Note | Primary                | Page Header         | Right     |
| Actions                             | Dropdown               | Toolbar             | Right     |
| Filter                              | Icon Button            | Toolbar             | Right     |
| Refer Now 🚀                        | Primary                | Sidebar             | Left      |
| dates                               | Inline Link            | Empty State         | Center    |
| Purchase Return / Debit Note        | Inline Link            | Empty State         | Center    |
| Previous                            | Pagination             | Bottom Right        | Right     |
| Next                                | Pagination             | Bottom Right        | Right     |
| WhatsApp                            | Floating Action Button | Bottom Right        | Floating  |

---

# 4. Tables

## Purchase Returns Table

### Column Headers

1. Amount
2. Status
3. Mode
4. Bill #
5. Vendor
6. Date

### Available Features

| Feature           | Available |
| ----------------- | --------- |
| Search            | ✔         |
| Column Sorting    | ✔         |
| Column Filters    | ✔         |
| Actions Dropdown  | ✔         |
| Empty State       | ✔         |
| Horizontal Scroll | ✔         |
| Pagination        | ✔         |

### Not Visible

* Row Selection
* Bulk Actions
* Status Badges
* Row Actions
* Data Rows

---

# 5. Navigation Elements

## Sidebar Navigation

### Purchases ▼

* Purchases
* Purchase Orders
* **Debit Notes** *(Selected)*

### Additional Navigation

* Sales
* Quotations+
* Expenses+
* SwipeAI
* Products & Services
* Inventory
* Payments *(partially visible)*
* Invite Users
* Settings

---

## Status Tabs

* All
* Pending
* Paid
* Cancelled
* Drafts

---

## Header Actions

* Document Settings
* Create Purchase Return/Debit Note

---

## Toolbar

* Search
* This Year
* Actions
* Filter

---

# 6. Cards, Panels & Components

Visible Components

* Global Header
* Sidebar Navigation
* Subscription Banner
* Page Header
* Status Tabs
* Search Box
* Dropdown Filters
* Data Grid Header
* Empty State Panel
* Statistic Cards
* Horizontal Scrollbar
* Pagination
* Footer
* Floating WhatsApp Button
* Sort Icons
* Filter Icons
* Inline Hyperlinks
* Promotional Referral Card

---

# 7. Layout Structure

```text
Global Header
────────────────────────────────────────────────────────────────────────────

Sidebar │ Main Content
        │
        ├── Subscription Banner
        ├── Page Header
        ├── Status Tabs
        ├── Search Toolbar
        ├── Purchase Return Table Header
        ├── Empty State
        ├── Horizontal Scrollbar
        ├── Summary Cards
        ├── Pagination
        └── Footer
```

### Grid Layout

* Overall: **2-column layout** (Sidebar + Main Content)
* Header: **3-column layout**
* Toolbar: **4-column responsive layout**
* Table: **6-column grid**
* Summary Cards: **3 equal-width cards**
* Footer: **Full-width**

---

# 8. Complete Field Inventory

| Section       | Row    | Column | Label                                           | Field Type                   |
| ------------- | ------ | ------ | ----------------------------------------------- | ---------------------------- |
| Global Header | 1      | 2      | MARUF DRESSES                                   | Company Selector             |
| Global Header | 1      | 3      | Ask SwipeAI                                     | Global Search                |
| Page Header   | 1      | 2      | Document Settings                               | Button                       |
| Page Header   | 1      | 3      | + Create Purchase Return/Debit Note             | Primary Button               |
| Status Tabs   | 1      | 1      | All                                             | Tab                          |
| Status Tabs   | 1      | 2      | Pending                                         | Tab                          |
| Status Tabs   | 1      | 3      | Paid                                            | Tab                          |
| Status Tabs   | 1      | 4      | Cancelled                                       | Tab                          |
| Status Tabs   | 1      | 5      | Drafts                                          | Tab                          |
| Toolbar       | 1      | 1      | Search by transaction, customers, invoice etc.. | Search Textbox               |
| Toolbar       | 1      | 2      | This Year                                       | Dropdown                     |
| Toolbar       | 1      | 3      | Actions                                         | Dropdown                     |
| Toolbar       | 1      | 4      | Filter                                          | Icon Button                  |
| Table         | Header | 1      | Amount                                          | Sortable Column              |
| Table         | Header | 2      | Status                                          | Filterable Column            |
| Table         | Header | 3      | Mode                                            | Filterable Column            |
| Table         | Header | 4      | Bill #                                          | Sortable / Filterable Column |
| Table         | Header | 5      | Vendor                                          | Text Column                  |
| Table         | Header | 6      | Date                                            | Sortable Column              |

---

# 9. UI Observations

### Strengths

* Consistent UI with the Sales, Purchases, and Sales Returns modules.
* Strong primary CTA (**+ Create Purchase Return/Debit Note**) positioned prominently.
* Empty-state messaging clearly guides users toward corrective actions.
* Summary cards remain visible, maintaining layout consistency.
* Horizontal scrolling support suggests scalability for additional columns.

### Observations

* Unlike the earlier cropped Purchase Returns screenshot, **only one empty-state message** is present, eliminating the apparent duplication.
* The sidebar correctly highlights **Debit Notes** under the **Purchases** module.
* The **Vendor** column aligns with procurement terminology, distinguishing it from the **Customer** column used in Sales Returns.
* Pagination controls are disabled due to a single empty page.
* The horizontal scrollbar is visible even without data, indicating the table container retains its scrollable structure.

---

# 10. Text Wireframe (ASCII Layout)

```text
────────────────────────────────────────────────────────────────────────────────────────────────────
swipe | MARUF DRESSES | [ Ask SwipeAI ] | ctrl+k | ⚡ 🔔 📣 👤
────────────────────────────────────────────────────────────────────────────────────────────────────

┌──────────── Sidebar ─────────────┐  ┌──────────────────────────────────────────────────────────────┐
│ Purchases ▼                      │  │ Get GSTR-1, Sales, P&L and 40+ Reports [Subscribe Now]       │
│ ├─ Purchases                     │  ├──────────────────────────────────────────────────────────────┤
│ ├─ Purchase Orders               │  │ Purchase Returns / Debit Notes                               │
│ ├─ Debit Notes ●                 │  │                  [Document Settings]                         │
│ Sales                            │  │        [+ Create Purchase Return/Debit Note]                │
│ Quotations+                      │  ├──────────────────────────────────────────────────────────────┤
│ Expenses+                        │  │ [All] [Pending] [Paid] [Cancelled] [Drafts]                 │
│ SwipeAI                          │  ├──────────────────────────────────────────────────────────────┤
│ Products & Services              │  │ [ Search by transaction, customers, invoice etc.. ]         │
│ Inventory                        │  │ [ This Year ▼ ] [ Actions ▼ ] [⚙ Filter]                    │
│ Payments                         │  ├──────────────────────────────────────────────────────────────┤
│ Invite Users                     │  │ Amount | Status | Mode | Bill # | Vendor | Date             │
│ Settings                         │  │──────────────────────────────────────────────────────────────│
│                                  │  │                                                              │
│ Refer a friend & Get ₹2000       │  │      Oops 😳 ! No purchase return / debit notes found.      │
│ [ Refer Now 🚀 ]                 │  │ Please select different dates or create a new               │
└──────────────────────────────────┘  │      dates | Purchase Return / Debit Note                   │
                                      ├──────────────────────────────────────────────────────────────┤
                                      │ ───────────────── Horizontal Scrollbar ──────────────────── │
                                      ├──────────────────────────────────────────────────────────────┤
                                      │ [ Total ₹0.00 ] [ Paid ₹0.00 ] [ Pending ₹0.00 ]   1/1 ◀ ▶ │
                                      └──────────────────────────────────────────────────────────────┘

Footer:
swipe | ©2026 NextSpeed Technologies Private Limited. All rights reserved.
🔒 Data is secured via 'bank-grade' security

                                                       ● WhatsApp Floating Action Button
```

## Comparison with Related Modules

| Feature              | Sales Returns / Credit Notes         | Purchase Returns / Debit Notes         |
| -------------------- | ------------------------------------ | -------------------------------------- |
| Business Entity      | Customer                             | Vendor                                 |
| Sidebar Active Item  | Credit Notes                         | Debit Notes                            |
| Primary CTA          | + Create Sales Return/Credit Note    | + Create Purchase Return/Debit Note    |
| Table Column         | Customer                             | Vendor                                 |
| Empty State          | No sales return / credit notes found | No purchase return / debit notes found |
| Document Settings    | ✔                                    | ✔                                      |
| Horizontal Scrollbar | ✔                                    | ✔                                      |
| Summary Cards        | Total / Paid / Pending               | Total / Paid / Pending                 |
| Pagination           | 1/1                                  | 1/1                                    |

The **Purchase Returns / Debit Notes** page mirrors the **Sales Returns / Credit Notes** page almost exactly, with the primary differences being the business terminology (**Vendor** vs. **Customer**) and the creation action tailored to purchase return workflows.


# UI Layout Analysis – Expenses Listing Page

> **Context:** This is the **Expenses** module of Swipe. It is the central page used to manage expense transactions, categorize expenses, upload expenses in bulk, and create new expense entries. Unlike the invoice pages, this module introduces **expense categories**, **bulk upload**, and a wider transaction table.

---

# 1. Page Overview

### Page Title

**Expenses**

### Purpose

Manage business expense transactions by:

* Recording expenses
* Categorizing expenses
* Searching/filtering expenses
* Bulk importing expenses
* Viewing/editing expense records
* Monitoring payment status

### Page Type

* Expense Management Dashboard
* Data Listing Page
* Master List View

### Total Major Sections

1. Global Header
2. Left Sidebar Navigation
3. Subscription Banner
4. Expenses Header
5. Transaction Status Tabs
6. Search & Filter Toolbar
7. Expenses Table
8. Summary Cards
9. Pagination
10. Footer
11. Floating WhatsApp Button

**Total Sections: 11**

---

# 2. Section-wise Analysis

---

# Section 1 – Global Header

### Description

Application-wide navigation.

### Row 1 (5 Columns)

| Column | Label         | Field Type       |
| ------ | ------------- | ---------------- |
| 1      | swipe         | Logo             |
| 2      | MARUF DRESSES | Company Selector |
| 3      | Ask SwipeAI   | Global Search    |
| 4      | ctrl+k        | Shortcut Hint    |
| 5      | Utility Icons | Icon Buttons     |

### Utility Icons

* Lightning
* Notification
* Announcement
* User Profile

---

# Section 2 – Left Sidebar Navigation

### Expanded Module

**Expenses+**

### Submenu

* **Expenses** *(Active)*
* Indirect Income

---

### Other Navigation

* Sales
* Purchases
* Quotations+
* SwipeAI
* Products & Services
* Inventory
* Payments
* Invite Users
* Settings

---

### Sidebar Card

Heading

**Refer a friend & Get ₹2000 🥳**

Button

**Refer Now 🚀**

---

# Section 3 – Subscription Banner

### Row 1

Text

**Create unlimited E-way bills and E-invoices on mobile & web**

Button

**Go Premium 🚀**

---

# Section 4 – Expenses Header

### Row 1 (3 Columns)

| Column | Control            | Type             |
| ------ | ------------------ | ---------------- |
| 1      | Expenses           | Page Heading     |
| 2      | Expense Categories | Secondary Button |
| 3      | + Create Expense   | Primary Button   |

---

# Section 5 – Transaction Status Tabs

### Row 1

Tabs

* All Transactions
* Pending
* Paid
* Cancelled

Visible Badge

**All Transactions**

* **1**

Active Tab

**All Transactions**

---

# Section 6 – Search & Filter Toolbar

### Row 1 (6 Columns)

| Column | Label                                   | Type             |
| ------ | --------------------------------------- | ---------------- |
| 1      | Search with Category, Description, Mode | Search Textbox   |
| 2      | Select Category                         | Dropdown         |
| 3      | This Year                               | Dropdown         |
| 4      | Bulk Upload (BETA)                      | Secondary Button |
| 5      | Filter                                  | Icon Button      |

> The toolbar is visually arranged as five major controls, with the **Bulk Upload** button occupying a wider action area.

### Search Placeholder

**Search with Category, Description, Mode**

### Category Placeholder

**Select Category**

### Default Value

**This Year**

---

# Section 7 – Expenses Table

## Table Title

Expense Transactions

---

## Column Headers

| Column              |
| ------------------- |
| Amount              |
| Status              |
| Mode                |
| Category Name       |
| Expense #           |
| Date / Created Time |
| Vendor              |
| Description         |
| Supplier Details    |
| Actions             |

---

## Header Features

### Amount

* Sort
* Filter

### Status

No visible filter icon.

### Mode

No visible filter icon.

### Category Name

Filter Icon

### Expense

Filter Icon

### Date / Created Time

Filter Icon

### Remaining Columns

Standard text headers.

---

## Visible Data Row

### Amount

₹126.00

---

### Status

paid

Green Badge

---

### Mode

Cash

Green Badge

---

### Category Name

Repair & Maintenance

---

### Expense

EXP-1

Subtext

by Chandan

---

### Date / Created Time

22 Jul 2026

Subtext

a few seconds ago

---

### Vendor

Empty

---

### Description

Title

Repair & Maintenance

Description

fvfd

---

### Supplier Details

Empty

---

### Actions

View

Edit

More (•••)

---

# Section 8 – Summary Cards

### Row 1 (3 Columns)

| Card    | Value   |
| ------- | ------- |
| Total   | ₹126.00 |
| Paid    | ₹126.00 |
| Pending | ₹0.00   |

---

# Section 9 – Pagination

### Right aligned

Current Page

**1/1**

Buttons

* Previous
* Next

---

# Section 10 – Footer

Logo

**swipe**

Footer Text

**©2026 NextSpeed Technologies Private Limited. All rights reserved.**

Security Link

**Data is secured via 'bank-grade' security**

---

# Section 11 – Floating Action Button

Bottom-right

WhatsApp Floating Button

---

# 3. Buttons & Actions

| Button             | Type                   | Position     | Alignment |
| ------------------ | ---------------------- | ------------ | --------- |
| Go Premium 🚀      | Primary                | Banner       | Center    |
| Expense Categories | Secondary              | Header       | Right     |
| + Create Expense   | Primary                | Header       | Right     |
| Bulk Upload (BETA) | Secondary              | Toolbar      | Right     |
| Filter             | Icon Button            | Toolbar      | Right     |
| View               | Secondary              | Table Row    | Right     |
| Edit               | Secondary              | Table Row    | Right     |
| More (•••)         | Icon Menu              | Table Row    | Right     |
| Refer Now 🚀       | Primary                | Sidebar      | Left      |
| Previous           | Pagination             | Bottom Right | Right     |
| Next               | Pagination             | Bottom Right | Right     |
| WhatsApp           | Floating Action Button | Bottom Right | Floating  |

---

# 4. Tables

## Expense Transactions Table

### Column Headers

1. Amount
2. Status
3. Mode
4. Category Name
5. Expense #
6. Date / Created Time
7. Vendor
8. Description
9. Supplier Details
10. Actions

### Available Features

| Feature         | Available            |
| --------------- | -------------------- |
| Search          | ✔                    |
| Category Filter | ✔                    |
| Year Filter     | ✔                    |
| Bulk Upload     | ✔                    |
| Sorting         | ✔ (Amount)           |
| Header Filters  | ✔ (Selected Columns) |
| Pagination      | ✔                    |
| Status Badges   | ✔                    |
| Row Actions     | ✔                    |

### Not Visible

* Row Selection
* Bulk Delete
* Inline Editing
* Export

---

# 5. Navigation Elements

## Sidebar

### Expenses+

* **Expenses** *(Active)*
* Indirect Income

### Other Modules

* Sales
* Purchases
* Quotations+
* SwipeAI
* Products & Services
* Inventory
* Payments
* Invite Users
* Settings

---

## Status Tabs

* All Transactions
* Pending
* Paid
* Cancelled

---

## Header Actions

* Expense Categories
* Create Expense

---

## Toolbar

* Search
* Category Dropdown
* This Year
* Bulk Upload
* Filter

---

# 6. Cards, Panels & Components

Visible Components

* Global Header
* Sidebar Navigation
* Promotional Banner
* Page Header
* Status Tabs
* Search Textbox
* Dropdowns
* Bulk Upload Button (BETA badge)
* Expense Data Grid
* Status Badges
* Action Buttons
* Summary Cards
* Pagination
* Floating WhatsApp Button
* Footer
* Filter Icons
* Sort Icons
* Promotional Referral Card

---

# 7. Layout Structure

```text
Global Header
────────────────────────────────────────────────────────────────────────────

Sidebar │ Main Content
        │
        ├── Premium Banner
        ├── Expenses Header
        ├── Transaction Tabs
        ├── Search & Filter Toolbar
        ├── Expense Transactions Table
        ├── Summary Cards
        ├── Pagination
        └── Footer
```

### Grid Layout

* Overall: **2-column layout** (Sidebar + Main Content)
* Header: **3-column layout**
* Toolbar: **5 primary controls**
* Table: **10-column grid**
* Summary: **3 statistic cards**
* Footer: **Full width**

---

# 8. Complete Field Inventory

| Section       | Row    | Column | Label                                   | Field Type        |
| ------------- | ------ | ------ | --------------------------------------- | ----------------- |
| Global Header | 1      | 2      | MARUF DRESSES                           | Company Selector  |
| Global Header | 1      | 3      | Ask SwipeAI                             | Global Search     |
| Header        | 1      | 2      | Expense Categories                      | Button            |
| Header        | 1      | 3      | + Create Expense                        | Primary Button    |
| Tabs          | 1      | 1      | All Transactions                        | Tab               |
| Tabs          | 1      | 2      | Pending                                 | Tab               |
| Tabs          | 1      | 3      | Paid                                    | Tab               |
| Tabs          | 1      | 4      | Cancelled                               | Tab               |
| Toolbar       | 1      | 1      | Search with Category, Description, Mode | Search Textbox    |
| Toolbar       | 1      | 2      | Select Category                         | Dropdown          |
| Toolbar       | 1      | 3      | This Year                               | Dropdown          |
| Toolbar       | 1      | 4      | Bulk Upload (BETA)                      | Button            |
| Toolbar       | 1      | 5      | Filter                                  | Icon Button       |
| Table         | Header | 1      | Amount                                  | Sortable Column   |
| Table         | Header | 2      | Status                                  | Text Column       |
| Table         | Header | 3      | Mode                                    | Text Column       |
| Table         | Header | 4      | Category Name                           | Filterable Column |
| Table         | Header | 5      | Expense #                               | Filterable Column |
| Table         | Header | 6      | Date / Created Time                     | Filterable Column |
| Table         | Header | 7      | Vendor                                  | Text Column       |
| Table         | Header | 8      | Description                             | Text Column       |
| Table         | Header | 9      | Supplier Details                        | Text Column       |
| Table         | Header | 10     | Actions                                 | Action Column     |

---

# 9. UI Observations

### Strengths

* Richer data model than the invoice modules, including **Category**, **Vendor**, **Supplier Details**, and **Description**.
* Dedicated **Expense Categories** management button provides quick access to master data.
* **Bulk Upload (BETA)** supports mass expense imports directly from the listing page.
* Status and payment mode use color-coded badges for quick scanning.
* Table supports filtering across multiple business attributes.

### Observations

* The **Vendor** and **Supplier Details** columns are empty in the visible row, indicating optional fields.
* The **Description** column displays both a title ("Repair & Maintenance") and a secondary text ("fvfd"), suggesting support for multi-line descriptions.
* Compared with Sales and Purchases, the table is wider (10 columns), increasing the information density.
* Unlike the invoice modules, this page includes **Edit** directly as a row action, alongside **View** and **More (•••)**.
* The **Bulk Upload** control includes a visible **BETA** badge, indicating the feature may still be in preview.

---

# 10. Text Wireframe (ASCII Layout)

```text
────────────────────────────────────────────────────────────────────────────────────────────────────────
swipe | MARUF DRESSES | [ Ask SwipeAI ] | ctrl+k | ⚡ 🔔 📣 👤
────────────────────────────────────────────────────────────────────────────────────────────────────────

┌──────────── Sidebar ─────────────┐  ┌────────────────────────────────────────────────────────────────────┐
│ Expenses+ ▼                      │  │ Create unlimited E-way bills and E-invoices... [Go Premium]       │
│ ├─ Expenses ●                    │  ├────────────────────────────────────────────────────────────────────┤
│ ├─ Indirect Income               │  │ Expenses                         [Expense Categories]              │
│ Sales                            │  │                                  [+ Create Expense]               │
│ Purchases                        │  ├────────────────────────────────────────────────────────────────────┤
│ Quotations+                      │  │ [All Transactions] [Pending] [Paid] [Cancelled]                  │
│ SwipeAI                          │  ├────────────────────────────────────────────────────────────────────┤
│ Products & Services              │  │ [Search with Category, Description, Mode]                        │
│ Inventory                        │  │ [Select Category ▼] [This Year ▼] [Bulk Upload BETA] [⚙]         │
│ Payments                         │  ├────────────────────────────────────────────────────────────────────┤
│ Invite Users                     │  │ Amount | Status | Mode | Category | Expense# | Date | Vendor... │
│ Settings                         │  │ ₹126 | paid | Cash | Repair & Maintenance | EXP-1 | 22 Jul ...  │
│                                  │  │                                         [View] [Edit] [...]      │
│ Refer a friend & Get ₹2000       │  ├────────────────────────────────────────────────────────────────────┤
│ [ Refer Now 🚀 ]                 │  │ [Total ₹126] [Paid ₹126] [Pending ₹0]                 1/1 ◀ ▶    │
└──────────────────────────────────┘  └────────────────────────────────────────────────────────────────────┘

Footer:
swipe | ©2026 NextSpeed Technologies Private Limited. All rights reserved.
🔒 Data is secured via 'bank-grade' security

                                                          ● WhatsApp Floating Action Button
```

## Comparison with Other Listing Modules

| Feature            | Sales             | Purchases           | Expenses           |
| ------------------ | ----------------- | ------------------- | ------------------ |
| Primary Entity     | Customer          | Vendor              | Expense            |
| Primary Action     | Create Invoice    | Create Purchase     | Create Expense     |
| Master Data Button | Document Settings | Document Settings   | Expense Categories |
| Bulk Upload        | No                | No                  | **Yes (BETA)**     |
| Category Filter    | No                | No                  | **Yes**            |
| Description Column | No                | No                  | **Yes**            |
| Supplier Details   | No                | No                  | **Yes**            |
| Row Actions        | View, Send        | View, Send, Payment | View, Edit         |
| Table Width        | 6 columns         | 6 columns           | **10 columns**     |


# UI Layout Analysis – Products & Services (Items Listing Page)

> **Context:** This is the **Products & Services** master module. It is the central catalog management page used for maintaining products, services, inventory quantities, pricing, purchase prices, categories, groups, and price lists. Compared to the Sales and Expenses modules, this page acts as **master data management** rather than transaction management.

---

# 1. Page Overview

### Page Title

**Products & Services**

### Purpose

Manage the complete product/service catalog, including:

* Product master records
* Services
* Categories
* Groups
* Price Lists
* Deleted Items
* Inventory quantity
* Selling & purchase prices

### Page Type

* Master Data Management
* Product Catalog
* Inventory Master
* Listing Page

### Total Major Sections

1. Global Header
2. Left Sidebar Navigation
3. Page Header
4. Module Tabs
5. Search & Filter Toolbar
6. Product Table
7. Pagination
8. Promotional Banner
9. Footer
10. Floating WhatsApp Button

**Total Sections: 10**

---

# 2. Section-wise Analysis

---

# Section 1 – Global Header

### Description

Global application navigation.

### Row 1 (5 Columns)

| Column | Label         | Field Type         |
| ------ | ------------- | ------------------ |
| 1      | swipe         | Logo               |
| 2      | MARUF DRESSES | Company Selector   |
| 3      | Ask SwipeAI   | Global Search      |
| 4      | ctrl+k        | Shortcut Indicator |
| 5      | Utility Icons | Icon Buttons       |

### Utility Icons

* Lightning
* Notification
* Announcement
* User Profile

---

# Section 2 – Left Sidebar Navigation

### Active Module

**Products & Services**

---

### Other Navigation

* Sales
* Purchases
* Quotations+
* Expenses+
* SwipeAI
* Inventory
* Payments
* Customers
* Vendors
* Projects
* Insights
* Reports
* OnlineStore
* E-way Bills
* Tally Sync
* More
* Invite Users
* Settings

---

### Sidebar Promotional Card

Heading

**Refer a friend & Get ₹2000 🥳**

Button

**Refer Now 🚀**

---

# Section 3 – Page Header

### Row 1 (3 Columns)

| Column | Control             | Type           |
| ------ | ------------------- | -------------- |
| 1      | Products & Services | Page Heading   |
| 2      | Actions             | Dropdown       |
| 3      | + New Item          | Primary Button |

> A filter/settings icon appears immediately before the **Actions** dropdown.

---

# Section 4 – Module Tabs

### Row 1

Tabs

* Items
* Categories
* Groups
* Price Lists
* Deleted

Visible Badge

**Items**

* **7**

Active Tab

**Items**

---

# Section 5 – Search & Filter Toolbar

### Row 1 (5 Columns)

| Column | Label                                              | Type           |
| ------ | -------------------------------------------------- | -------------- |
| 1      | Search products, category, description, barcode... | Search Textbox |
| 2      | Select Category                                    | Dropdown       |
| 3      | Filter/Settings Icon                               | Icon Button    |
| 4      | Actions                                            | Dropdown       |
| 5      | + New Item                                         | Primary Button |

### Placeholder

**Search products, category, description, barcode...**

### Dropdown Placeholder

**Select Category**

---

# Section 6 – Products Table

## Table Title

Products / Services List

---

## Column Headers

| Column                                                |
| ----------------------------------------------------- |
| Item                                                  |
| Qty                                                   |
| Selling Price (Disc %)                                |
| Purchase Price                                        |
| Created By *(cropped, partially visible as "Create")* |

### Header Features

#### Item

* Sort Icon
* Filter Icon

#### Qty

* Sort Icon
* Filter Icon

#### Selling Price (Disc %)

* Sort Icon

#### Purchase Price

No visible filter.

#### Created By

Column partially cropped.

---

## Visible Rows

### Row 1

#### Item

**COTTON PANT**

Subtext

* Product
* Barcode indicator

Avatar

**CP**

Green Circle

---

#### Qty

175 PCS

---

#### Selling Price

₹180.00

Subtext

5% incl. tax

---

#### Purchase Price

₹171.43

Subtext

5% excl. tax

---

#### Created By

Char *(partially visible due to cropping)*

---

### Row 2

Item

JB MENTS PANT 36 SIZE

Avatar

JM

Qty

80 PCS

Selling

₹240.00

Purchase

₹0.00

Created

Char

---

### Row 3

JB MENS PANT 34 SIZE

Qty

84 PCS

Selling

₹230.00

Purchase

₹0.00

---

### Row 4

JB MENS PANT 32 SIZE

Qty

85 PCS

Selling

₹220.00

Purchase

₹0.00

---

### Row 5

KIDS PANT SET

Qty

88 PCS

Selling

₹120.00

Purchase

₹0.00

---

### Row 6

Satan Gauti Full work

Subtext

Silk Saree

Qty

79 PCS

Selling

₹1050.00

Purchase

₹520.00

---

### Row 7

Banarasi

Qty

77 PCS

Selling

₹118.00

Purchase

₹59.00

---

# Section 7 – Pagination

Bottom-right.

Current Page

**1/1**

Buttons

* Previous
* Next

---

# Section 8 – Promotional Banner

### Card Title

**Batch & Expiry**

Description

Manage and organize products in Batches for seamless inventory management.

Social Proof

Justin and lakhs of businesses use premium.

Buttons

* Talk to a specialist
* Upgrade 🚀

---

# Section 9 – Footer

Logo

**swipe**

Footer Text

**©2026 NextSpeed Technologies Private Limited. All rights reserved.**

Security Link

**Data is secured via 'bank-grade' security**

---

# Section 10 – Floating Action Button

Bottom-right

WhatsApp Floating Button

---

# 3. Buttons & Actions

| Button               | Type                   | Position           | Alignment |
| -------------------- | ---------------------- | ------------------ | --------- |
| Actions              | Dropdown               | Header             | Right     |
| + New Item           | Primary                | Header             | Right     |
| Filter/Settings      | Icon Button            | Header             | Right     |
| Talk to a specialist | Secondary              | Promotional Banner | Right     |
| Upgrade 🚀           | Primary                | Promotional Banner | Right     |
| Refer Now 🚀         | Primary                | Sidebar            | Left      |
| Previous             | Pagination             | Bottom Right       | Right     |
| Next                 | Pagination             | Bottom Right       | Right     |
| WhatsApp             | Floating Action Button | Bottom Right       | Floating  |

---

# 4. Tables

## Products & Services Table

### Column Headers

1. Item
2. Qty
3. Selling Price (Disc %)
4. Purchase Price
5. Created By *(partially visible)*

### Available Features

| Feature           | Available             |
| ----------------- | --------------------- |
| Search            | ✔                     |
| Category Filter   | ✔                     |
| Sorting           | ✔                     |
| Column Filters    | ✔                     |
| Pagination        | ✔                     |
| Product Avatar    | ✔                     |
| Quantity Display  | ✔                     |
| Tax Information   | ✔                     |
| Horizontal Scroll | ✔ (visible scrollbar) |

### Not Visible

* Row Selection
* Bulk Actions
* Inline Editing
* Status Badges

---

# 5. Navigation Elements

## Sidebar

* Products & Services *(Active)*
* Inventory
* Payments
* Customers
* Vendors
* Projects
* Insights
* Reports
* OnlineStore
* E-way Bills
* Tally Sync
* More
* Invite Users
* Settings

---

## Module Tabs

* Items
* Categories
* Groups
* Price Lists
* Deleted

---

## Header Actions

* Filter/Settings
* Actions
* New Item

---

# 6. Cards, Panels & Components

Visible Components

* Global Header
* Sidebar Navigation
* Module Tabs
* Search Box
* Category Dropdown
* Product Data Grid
* Product Avatar Chips
* Pagination
* Promotional Upgrade Banner
* Horizontal Scrollbar
* Footer
* Floating WhatsApp Button
* Sort Icons
* Filter Icons
* Referral Card

---

# 7. Layout Structure

```text
Global Header
────────────────────────────────────────────────────────────────────────────

Sidebar │ Main Content
        │
        ├── Page Header
        ├── Module Tabs
        ├── Search & Filter Toolbar
        ├── Products Table
        ├── Horizontal Scrollbar
        ├── Pagination
        ├── Batch & Expiry Promotion
        └── Footer
```

### Grid Layout

* **Overall:** 2-column layout (Sidebar + Content)
* **Header:** 3-column action layout
* **Toolbar:** 5 control layout
* **Table:** 5+ visible columns (additional columns likely available via horizontal scroll)
* **Promotional Banner:** 3-column content/action layout

---

# 8. Complete Field Inventory

| Section       | Row    | Column | Label                                              | Field Type                 |
| ------------- | ------ | ------ | -------------------------------------------------- | -------------------------- |
| Global Header | 1      | 2      | MARUF DRESSES                                      | Company Selector           |
| Global Header | 1      | 3      | Ask SwipeAI                                        | Global Search              |
| Tabs          | 1      | 1      | Items                                              | Tab                        |
| Tabs          | 1      | 2      | Categories                                         | Tab                        |
| Tabs          | 1      | 3      | Groups                                             | Tab                        |
| Tabs          | 1      | 4      | Price Lists                                        | Tab                        |
| Tabs          | 1      | 5      | Deleted                                            | Tab                        |
| Toolbar       | 1      | 1      | Search products, category, description, barcode... | Search Textbox             |
| Toolbar       | 1      | 2      | Select Category                                    | Dropdown                   |
| Header        | 1      | 1      | Actions                                            | Dropdown                   |
| Header        | 1      | 2      | + New Item                                         | Primary Button             |
| Table         | Header | 1      | Item                                               | Sortable/Filterable Column |
| Table         | Header | 2      | Qty                                                | Sortable/Filterable Column |
| Table         | Header | 3      | Selling Price (Disc %)                             | Sortable Column            |
| Table         | Header | 4      | Purchase Price                                     | Numeric Column             |
| Table         | Header | 5      | Created By *(cropped)*                             | Text Column                |

---

# 9. UI Observations

### Strengths

* Well-organized master data interface with dedicated tabs for **Items**, **Categories**, **Groups**, **Price Lists**, and **Deleted**.
* Product avatars (initials in colored circles) improve row recognition.
* Selling and purchase prices include tax context (inclusive/exclusive), providing pricing transparency.
* Inventory quantity is prominently displayed in **PCS** units.
* Promotional banner is separated from operational content, reducing distraction.

### Observations

* The rightmost **Created By** column is partially cropped in the screenshot, indicating additional columns are available through the horizontal scrollbar.
* No row-level action buttons (View/Edit/Delete) are visible within the current viewport; they may exist beyond the visible columns.
* Product rows use a two-line layout with the item name on the first line and metadata (type, barcode, category) on the second.
* A horizontal scrollbar is present beneath the table, confirming support for additional off-screen columns.
* Unlike transaction modules, this page focuses on **master records** rather than document workflows.

---

# 10. Text Wireframe (ASCII Layout)

```text
────────────────────────────────────────────────────────────────────────────────────────────────────────
swipe | MARUF DRESSES | [ Ask SwipeAI ] | ctrl+k | ⚡ 🔔 📣 👤
────────────────────────────────────────────────────────────────────────────────────────────────────────

┌──────────── Sidebar ─────────────┐  ┌────────────────────────────────────────────────────────────────────┐
│ Products & Services ●            │  │ Products & Services                           [⚙] [Actions ▼]      │
│ Inventory                        │  │                                              [+ New Item]          │
│ Payments                         │  ├────────────────────────────────────────────────────────────────────┤
│ Customers                        │  │ [Items] [Categories] [Groups] [Price Lists] [Deleted]            │
│ Vendors                          │  ├────────────────────────────────────────────────────────────────────┤
│ Projects                         │  │ [Search products, category, description, barcode...]             │
│ Reports                          │  │ [Select Category ▼]                                               │
│ More                             │  ├────────────────────────────────────────────────────────────────────┤
│ Invite Users                     │  │ Item | Qty | Selling Price | Purchase Price | Created By ...     │
│ Settings                         │  │ CP  COTTON PANT             175 PCS   ₹180.00   ₹171.43          │
│                                  │  │ JM  JB MENTS PANT 36 SIZE    80 PCS   ₹240.00   ₹0.00            │
│ Refer a friend & Get ₹2000       │  │ JM  JB MENS PANT 34 SIZE     84 PCS   ₹230.00   ₹0.00            │
│ [ Refer Now 🚀 ]                 │  │ JM  JB MENS PANT 32 SIZE     85 PCS   ₹220.00   ₹0.00            │
└──────────────────────────────────┘  │ KP  KIDS PANT SET            88 PCS   ₹120.00   ₹0.00            │
                                      │ SG  Satan Gauti Full work    79 PCS   ₹1050.00  ₹520.00          │
                                      │ BA  Banarasi                77 PCS   ₹118.00   ₹59.00            │
                                      ├────────────────────────────────────────────────────────────────────┤
                                      │ ───────────────── Horizontal Scrollbar ───────────────────────── │
                                      │                                                     1/1 ◀ ▶       │
                                      ├────────────────────────────────────────────────────────────────────┤
                                      │ Batch & Expiry                                                   │
                                      │ Manage and organize products in Batches...                       │
                                      │ [Talk to a specialist]                              [Upgrade 🚀] │
                                      └────────────────────────────────────────────────────────────────────┘

Footer:
swipe | ©2026 NextSpeed Technologies Private Limited. All rights reserved.
🔒 Data is secured via 'bank-grade' security

                                                         ● WhatsApp Floating Action Button
```

## Comparison with Other Master/Transaction Modules

| Feature           | Sales             | Purchases            | Expenses       | Products & Services                                     |
| ----------------- | ----------------- | -------------------- | -------------- | ------------------------------------------------------- |
| Purpose           | Transactions      | Transactions         | Transactions   | **Master Data**                                         |
| Primary CTA       | Create Invoice    | Create Purchase      | Create Expense | New Item                                                |
| Master Tabs       | Status            | Status               | Status         | **Items / Categories / Groups / Price Lists / Deleted** |
| Category Filter   | No                | No                   | Yes            | Yes                                                     |
| Product Avatar    | No                | No                   | No             | **Yes**                                                 |
| Quantity Column   | No                | No                   | No             | **Yes**                                                 |
| Selling Price     | No                | No                   | No             | **Yes**                                                 |
| Purchase Price    | No                | Yes (document level) | No             | **Yes (master level)**                                  |
| Horizontal Scroll | Limited           | Limited              | No             | **Yes**                                                 |
| Promotional Card  | Service Promotion | Service Promotion    | None           | **Batch & Expiry Upgrade**                              |



# UI Layout Analysis – Add Item (Product) Right Slide Panel

> **Context:** This is the **Add Item** right-side slide-over panel opened from the **Products & Services → + New Item** action. The panel overlays the listing page while keeping the product list visible in the background. The second image is a zoomed-in view of the **More Details?** expandable section.

---

# 1. Page Overview

### Page Title

**Add Item**

### Purpose

Create a new **Product** or **Service** by entering:

* Basic product information
* Pricing
* Tax details
* Category
* Barcode
* Images
* Description
* Inventory opening stock
* Additional inventory settings
* Discount & stock settings

### Page Type

* Right Slide-over Drawer
* Master Data Entry Form
* Multi-section Form
* Product Creation Wizard (Single Page)

### Total Major Sections

1. Drawer Header
2. Top Navigation Tabs
3. Basic Details
4. Add Custom Fields Banner
5. Additional Information
6. Opening Stock
7. More Details (Expandable)
8. Footer Actions

**Total Sections: 8**

---

# 2. Section-wise Analysis

---

# Section 1 – Drawer Header

### Row 1 (2 Columns)

| Column | Control    | Type                 |
| ------ | ---------- | -------------------- |
| 1      | ✕ Add Item | Drawer Title / Close |
| 2      | Add Item   | Primary Button       |

---

# Section 2 – Top Navigation Tabs

### Row 1 (5 Columns)

| Column | Label             | Type          |
| ------ | ----------------- | ------------- |
| 1      | Details           | Tab (Active)  |
| 2      | Price Lists 🔒    | Tab           |
| 3      | Attachments       | Tab           |
| 4      | Variants 🔒       | Toggle/Option |
| 5      | Add Custom Fields | Link/Button   |

---

# Section 3 – Basic Details

## Heading

**Basic Details**

---

### Row 1 (2 Columns)

| Column | Label   | Type                      |
| ------ | ------- | ------------------------- |
| 1      | Product | Segment Button (Selected) |
| 2      | Service | Segment Button            |

---

### Row 2 (1 Column)

| Column | Label         | Type       |
| ------ | ------------- | ---------- |
| 1      | *Product Name | Text Input |

Placeholder

**Enter Item Name**

Required

**Yes (*)**

---

### Row 3 (2 Columns)

#### Column 1

Label

**Selling Price**

Field Type

Currency Textbox

Placeholder

**Enter Selling Price**

Dropdown

**with Tax**

Helper Text

**Inclusive of Taxes**

---

#### Column 2

Label

***Tax %**

Field Type

Numeric Input + Dropdown

Default

**0**

Dropdown Default

**(0% CGST & 0% SGST, 0% IGST)**

Helper Link

**Select tax type**

---

### Row 4 (1 Column)

| Column | Label        | Type             |
| ------ | ------------ | ---------------- |
| 1      | Primary Unit | Dropdown/Textbox |

---

# Section 4 – Add Custom Fields

Promotional Card

Heading

**Add custom fields**

Description

**Personalize it to perfectly suit your style.**

Buttons

* Talk to a specialist
* Upgrade 🚀

---

# Section 5 – Additional Information

Heading

**Additional Information**

Badge

**OPTIONAL**

---

### Row 1 (2 Columns)

#### Column 1

HSN/SAC

Textbox

Placeholder

HSN/SAC

Helper

**Click here to check GST approved HSN/SAC codes.**

---

#### Column 2

Purchase Price

Currency Input

Dropdown

with Tax

---

### Row 2 (2 Columns)

#### Column 1

Barcode

Textbox

Default Visible

**2273546883467** *(visible example)*

Button

**Auto Generate**

---

#### Column 2

Category

Dropdown

Placeholder

**Select Category**

---

### Row 3 (2 Columns)

#### Column 1

Product Images & Videos

Upload Area

Upload Button

Accepted

PNG/JPG/Video

Limit

10 files

---

#### Column 2

Empty

---

### Row 4 (1 Column)

Description

Rich Text Editor

Toolbar

* Bold
* Italic
* Underline
* Strike
* UL
* OL

Placeholder

**Add product description here...**

AI Button

**✨ AI**

---

# Section 6 – Opening Stock

Heading

**Opening Stock**

Badge

**OPTIONAL**

Right Action

**Add batches**

---

### Row 1 (2 Columns)

#### Column 1

Opening Quantity

Number Input

Default

0

---

#### Column 2

Opening Purchase Price (with tax)

Currency Input

Default

0

---

### Row 2 (1 Column)

Opening Stock Value (with tax)

Currency Input

Default

0

---

# Section 7 – More Details?

Expandable Accordion

Description

**Cess, Show OnlineDiscount, Inventory tracking, Low stock alerts etc...**

---

## Expanded Content (from zoomed image)

### Row 1 (2 Columns)

#### Column 1

Discount

Number Input

Default

0

Dropdown

Percentage (%)

Helper

Discount will be calculated based on the selected option.

---

#### Column 2

Max Discount % Allowed 🔒

Textbox

Placeholder

eg. 10

Disabled/Premium

Helper

Upgrade required.

---

### Row 2 (2 Columns)

#### Column 1

Cess %

Number Input

Default

0

Suffix

%

---

#### Column 2

Low Stock Alert at

Number Input

Default

0

Helper

You will be notified once stock reaches minimum stock qty. (BETA)

---

### Row 3 (2 Columns)

#### Column 1

Show in Online Store

Toggle

Default

ON

Helper

Show or hide the product in catalogue/online store

---

#### Column 2

Not For Sale

Toggle

Default

OFF

Helper

Hides the item for sale and shows only while making a purchase.

---

# Section 8 – Footer Actions

Bottom-left

Primary Button

**Add Item**

---

# 3. Buttons & Actions

| Button               | Type          | Position             | Alignment |
| -------------------- | ------------- | -------------------- | --------- |
| Add Item             | Primary       | Header Right         | Right     |
| Product              | Segmented     | Basic Details        | Left      |
| Service              | Segmented     | Basic Details        | Left      |
| Talk to a specialist | Secondary     | Custom Fields Banner | Right     |
| Upgrade 🚀           | Premium       | Custom Fields Banner | Right     |
| Auto Generate        | Secondary     | Barcode Row          | Right     |
| Upload               | Upload Button | Images Section       | Left      |
| ✨ AI                 | AI Button     | Description          | Left      |
| Add batches          | Text Button   | Opening Stock        | Right     |
| Add Custom Fields    | Link          | Header               | Right     |
| Add Item             | Primary       | Footer               | Left      |

---

# 4. Tables

No traditional data tables are present.

The page contains:

* Form Sections
* Upload Area
* Rich Text Editor
* Accordion
* Toggle Controls

---

# 5. Navigation Elements

## Drawer Header

* Close (✕)
* Add Item

---

## Tabs

* Details *(Active)*
* Price Lists 🔒
* Attachments
* Variants 🔒

---

## Accordion

* More Details?

---

## Segmented Control

* Product
* Service

---

# 6. Cards, Panels & Components

Visible Components

* Right Slide Drawer
* Header
* Navigation Tabs
* Segmented Buttons
* Form Cards
* Promotional Banner
* Rich Text Editor
* Upload Area
* AI Assistant Button
* Accordion
* Toggle Switches
* Premium Locked Fields
* Helper Text
* Dropdowns
* Numeric Inputs
* Upload Widget

---

# 7. Layout Structure

```text
Background Products Page (Dimmed)
│
├── Right Slide Drawer
│   ├── Header
│   ├── Navigation Tabs
│   ├── Basic Details
│   ├── Promotion Banner
│   ├── Additional Information
│   ├── Opening Stock
│   ├── More Details (Accordion)
│   └── Footer Action
```

### Grid Layout

* Drawer occupies approximately **60–65%** of the viewport width.
* Most form content follows a **2-column responsive grid**.
* Full-width fields are used for primary inputs (e.g., Product Name, Description).
* Accordion expands inline without opening a new modal.

---

# 8. Complete Field Inventory

| Section                | Row | Column | Label                             | Field Type         |
| ---------------------- | --- | ------ | --------------------------------- | ------------------ |
| Basic Details          | 1   | 1      | Product                           | Segmented Button   |
| Basic Details          | 1   | 2      | Service                           | Segmented Button   |
| Basic Details          | 2   | 1      | *Product Name                     | Textbox            |
| Basic Details          | 3   | 1      | Selling Price                     | Currency Input     |
| Basic Details          | 3   | 2      | *Tax %                            | Numeric + Dropdown |
| Basic Details          | 4   | 1      | Primary Unit                      | Dropdown           |
| Additional Information | 1   | 1      | HSN/SAC                           | Textbox            |
| Additional Information | 1   | 2      | Purchase Price                    | Currency Input     |
| Additional Information | 2   | 1      | Barcode                           | Textbox            |
| Additional Information | 2   | 2      | Category                          | Dropdown           |
| Additional Information | 3   | 1      | Product Images & Videos           | Upload             |
| Additional Information | 4   | 1      | Description                       | Rich Text Editor   |
| Opening Stock          | 1   | 1      | Opening Quantity                  | Number Input       |
| Opening Stock          | 1   | 2      | Opening Purchase Price (with tax) | Currency Input     |
| Opening Stock          | 2   | 1      | Opening Stock Value (with tax)    | Currency Input     |
| More Details           | 1   | 1      | Discount                          | Number + Dropdown  |
| More Details           | 1   | 2      | Max Discount % Allowed            | Locked Textbox     |
| More Details           | 2   | 1      | Cess %                            | Number Input       |
| More Details           | 2   | 2      | Low Stock Alert at                | Number Input       |
| More Details           | 3   | 1      | Show in Online Store              | Toggle             |
| More Details           | 3   | 2      | Not For Sale                      | Toggle             |

---

# 9. UI Observations

### Strengths

* Logical progression from basic product details to advanced inventory settings.
* Uses collapsible **More Details?** section to keep the initial form uncluttered.
* Premium-only features are clearly marked with lock icons.
* Rich text editor and media upload are integrated directly into the form.
* Product/Service segmented control simplifies item type selection.

### Observations

* The **Details** tab is active, while **Price Lists** and **Variants** display lock indicators, suggesting subscription-based features.
* The **Add Item** action is duplicated at the header and footer, improving usability for long forms.
* The **More Details?** section defaults to collapsed, reducing visual complexity.
* The **Show in Online Store** toggle is enabled by default, while **Not For Sale** is disabled.
* The **Low Stock Alert at** helper explicitly labels the feature as **BETA**.
* Several helper texts explain calculations, tax behavior, and upgrade requirements, providing contextual guidance.

---

# 10. Text Wireframe (ASCII Layout)

```text
────────────────────────────────────────────────────────────────────────────────────────────
✕ Add Item                                                     [ Add Item ]
────────────────────────────────────────────────────────────────────────────────────────────

[Details] [Price Lists 🔒] [Attachments]                [Variants 🔒] [Add Custom Fields]

────────────────────────────────────────────────────────────────────────────────────────────
BASIC DETAILS

[ Product ] [ Service ]

* Product Name
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│ Enter Item Name                                                                         │
└──────────────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────┬───────────────────────────────────────────────────────────┐
│ Selling Price                │ * Tax %                                                  │
│ ₹ Enter Selling Price        │ 0                                                        │
│ [with Tax ▼]                 │ [(0% CGST & 0% SGST, 0% IGST) ▼]                         │
└──────────────────────────────┴───────────────────────────────────────────────────────────┘

Primary Unit
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                          │
└──────────────────────────────────────────────────────────────────────────────────────────┘

────────────────────────────────────────────────────────────────────────────────────────────
ADD CUSTOM FIELDS
Talk to a specialist                                            [ Upgrade 🚀 ]
────────────────────────────────────────────────────────────────────────────────────────────

ADDITIONAL INFORMATION (OPTIONAL)

┌──────────────────────────────┬───────────────────────────────────────────────────────────┐
│ HSN/SAC                      │ Purchase Price                                            │
│ Barcode [Auto Generate]      │ Category ▼                                                │
└──────────────────────────────┴───────────────────────────────────────────────────────────┘

Product Images & Videos
[ Upload ]

Description
[B][I][U][S][UL][OL]
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│ Add product description here...                                                         │
└──────────────────────────────────────────────────────────────────────────────────────────┘
[ ✨ AI ]

────────────────────────────────────────────────────────────────────────────────────────────
OPENING STOCK (OPTIONAL)

┌──────────────────────────────┬───────────────────────────────────────────────────────────┐
│ Opening Quantity             │ Opening Purchase Price (with tax)                         │
└──────────────────────────────┴───────────────────────────────────────────────────────────┘

Opening Stock Value (with tax)

────────────────────────────────────────────────────────────────────────────────────────────
▶ More Details?
Cess, Show OnlineDiscount, Inventory tracking, Low stock alerts etc...

(Expanded)

┌──────────────────────────────┬───────────────────────────────────────────────────────────┐
│ Discount                     │ Max Discount % Allowed 🔒                                 │
│ Cess %                       │ Low Stock Alert at                                        │
│ Show in Online Store [ON]    │ Not For Sale [OFF]                                        │
└──────────────────────────────┴───────────────────────────────────────────────────────────┘

[ Add Item ]
```

This **Add Item** drawer is substantially more feature-rich than the transaction-entry forms shown previously. It combines **product master management**, **pricing**, **inventory initialization**, **catalog visibility**, **tax configuration**, **media management**, and **advanced inventory settings** within a single slide-over interface while keeping the underlying product listing visible.


# UI Layout Analysis – Inventory (Warehouse Stock Listing Page)

> **Context:** This is the **Inventory → Warehouses** page. It provides a centralized warehouse inventory dashboard for monitoring stock quantities, stock valuation, warehouse operations, and inventory movement (Stock In / Stock Out). Compared to the **Products & Services** page, this page focuses on **live inventory management** rather than product master data.

---

# 1. Page Overview

### Page Title

**Inventory**

### Purpose

Manage warehouse inventory by:

* Viewing available stock
* Monitoring low stock
* Tracking inventory value
* Performing stock in/out operations
* Managing warehouses
* Searching and filtering inventory items
* Viewing inventory status and last update times

### Page Type

* Inventory Dashboard
* Warehouse Management
* Inventory Listing Page
* Stock Operations Page

### Total Major Sections

1. Global Header
2. Left Sidebar Navigation
3. Promotional Banner
4. Inventory Header
5. Warehouse Navigation Tabs
6. Inventory Summary Cards
7. Search & Filter Toolbar
8. Inventory Table
9. Promotional Upgrade Card
10. Footer
11. Floating WhatsApp Button

**Total Sections: 11**

---

# 2. Section-wise Analysis

---

# Section 1 – Global Header

### Description

Application-wide navigation header.

### Row 1 (5 Columns)

| Column | Label         | Field Type       |
| ------ | ------------- | ---------------- |
| 1      | swipe         | Logo             |
| 2      | MARUF DRESSES | Company Selector |
| 3      | Ask SwipeAI   | Global Search    |
| 4      | ctrl+k        | Shortcut Hint    |
| 5      | Utility Icons | Icon Buttons     |

### Utility Icons

* Lightning
* Notification
* Announcement
* User Profile

---

# Section 2 – Left Sidebar Navigation

### Active Module

**Inventory**

### Expanded Submenu

* **Warehouses** *(Active)*
* Timeline

### Other Navigation

* Sales
* Purchases
* Quotations+
* Expenses+
* SwipeAI
* Products & Services
* Payments
* Customers
* Vendors
* Projects
* Insights
* Reports
* Invite Users
* Settings

### Sidebar Promotional Card

Heading

**Refer a friend & Get ₹2000 🥳**

Button

**Refer Now 🚀**

---

# Section 3 – Promotional Banner

### Row 1

Message

**One Click to Convert Quotes → Invoices → E-Way Bills**

Button

**Convert Now ⚡**

---

# Section 4 – Inventory Header

### Row 1 (4 Columns)

| Column | Label                   | Type                   |
| ------ | ----------------------- | ---------------------- |
| 1      | Inventory               | Page Heading           |
| 2      | Bulk Items Stock In 🔒  | Primary Success Button |
| 3      | Bulk Items Stock Out 🔒 | Primary Danger Button  |
| 4      | Manage Warehouses 🔒    | Primary Blue Button    |

> Lock icons indicate premium or restricted functionality.

---

# Section 5 – Warehouse Navigation Tabs

### Row 1 (2 Columns)

| Column | Label       | Type                     |
| ------ | ----------- | ------------------------ |
| 1      | Warehouse   | Active Tab               |
| 2      | + Warehouse | Add Warehouse Tab/Button |

---

# Section 6 – Inventory Summary Cards

### Row 1 (4 Columns)

#### Card 1

**Low Stock**

Value

**0 Items (0 Qty)**

---

#### Card 2

**Positive Stock**

Value

**7 Items (668 Qty)**

---

#### Card 3

**Stock Value Sales Price**

Value

**₹ 1,91,316**

Info icon visible.

---

#### Card 4

**Stock Value With Purchase Price**

Value

**₹ 77,123**

Info icon visible.

---

# Section 7 – Search & Filter Toolbar

### Row 1 (4 Columns)

| Column | Label            | Type           |
| ------ | ---------------- | -------------- |
| 1      | Search Inventory | Search Textbox |
| 2      | Select Category  | Dropdown       |
| 3      | Actions          | Dropdown       |
| 4      | Information Icon | Icon Button    |

### Placeholder

**Search Inventory**

### Dropdown Placeholder

**Select Category**

---

# Section 8 – Inventory Table

## Table Title

Warehouse Inventory

---

## Column Headers

| Column         |
| -------------- |
| Item           |
| Qty            |
| Status         |
| Purchase Price |
| Sale Price     |
| Last Updated   |
| Actions        |

---

### Header Features

#### Item

* Sort Icon

#### Qty

* Sort Icon
* Filter Icon

#### Status

Badge Column

#### Purchase Price

Currency Column

#### Sale Price

Currency Column

#### Last Updated

Date/Time Column

#### Actions

Action Buttons

---

## Visible Rows

### Row 1

#### Item

**COTTON PANT**

Avatar

CP

Green

---

#### Qty

175 PCS

---

#### Status

**In Stock**

Green Badge

---

#### Purchase Price

₹171.43

Subtext

5% excl. tax

---

#### Sale Price

₹180.00

Subtext

5% incl. tax

---

#### Last Updated

Yesterday, 6:02 PM

---

#### Actions

* Stock In
* Stock Out

---

### Row 2

Item

JB MENTS PANT 36 SIZE

Qty

80 PCS

Status

In Stock

Purchase Price

₹0.00

Sale Price

₹240.00

Last Updated

11 Jan 24, 06:08

Actions

* Stock In
* Stock Out

---

### Row 3

JB MENS PANT 34 SIZE

Qty

84 PCS

Status

In Stock

Purchase Price

₹0.00

Sale Price

₹230.00

Actions

* Stock In
* Stock Out

---

### Row 4

JB MENS PANT 32 SIZE

Qty

85 PCS

Status

In Stock

Actions

* Stock In
* Stock Out

---

### Row 5

KIDS PANT SET

Qty

88 PCS

Status

In Stock

Actions

* Stock In
* Stock Out

---

### Row 6

Satan Gauti Full work

Qty

79 PCS

Purchase Price

₹520.00

Sale Price

₹1,050.00

Status

In Stock

---

### Row 7

Banarasi

Qty

77 PCS

Purchase Price

₹59.00

Sale Price

₹118.00

Status

In Stock

---

### Pagination

Current Page

**1/1**

---

# Section 9 – Promotional Card

### Title

**Add Multiple Warehouses**

Description

Get total control of your warehouses & track inventory easily.

Buttons

* Talk to a specialist
* Upgrade 🚀

---

# Section 10 – Footer

Logo

**swipe**

Footer Text

**©2026 NextSpeed Technologies Private Limited. All rights reserved.**

Security Link

**Data is secured via 'bank-grade' security**

---

# Section 11 – Floating Action Button

Bottom-right

WhatsApp Floating Button

---

# 3. Buttons & Actions

| Button                  | Type                   | Position         | Alignment |
| ----------------------- | ---------------------- | ---------------- | --------- |
| Convert Now ⚡           | Primary                | Banner           | Center    |
| Bulk Items Stock In 🔒  | Success                | Header           | Right     |
| Bulk Items Stock Out 🔒 | Danger                 | Header           | Right     |
| Manage Warehouses 🔒    | Primary                | Header           | Right     |
| + Warehouse             | Tab/Button             | Tabs             | Left      |
| Actions                 | Dropdown               | Toolbar          | Right     |
| Information Icon        | Icon                   | Toolbar          | Right     |
| Stock In                | Success Button         | Table Row        | Right     |
| Stock Out               | Danger Button          | Table Row        | Right     |
| Talk to a specialist    | Secondary              | Promotional Card | Right     |
| Upgrade 🚀              | Premium                | Promotional Card | Right     |
| Refer Now 🚀            | Primary                | Sidebar          | Left      |
| Previous                | Pagination             | Bottom Right     | Right     |
| Next                    | Pagination             | Bottom Right     | Right     |
| WhatsApp                | Floating Action Button | Bottom Right     | Floating  |

---

# 4. Tables

## Warehouse Inventory Table

### Column Headers

1. Item
2. Qty
3. Status
4. Purchase Price
5. Sale Price
6. Last Updated
7. Actions

### Available Features

| Feature         | Available |
| --------------- | --------- |
| Search          | ✔         |
| Category Filter | ✔         |
| Sorting         | ✔         |
| Qty Filter      | ✔         |
| Status Badges   | ✔         |
| Pagination      | ✔         |
| Row Actions     | ✔         |
| Product Avatars | ✔         |

### Not Visible

* Row Selection
* Bulk Delete
* Export
* Inline Editing

---

# 5. Navigation Elements

## Sidebar

### Inventory

* **Warehouses** *(Active)*
* Timeline

### Other Modules

* Sales
* Purchases
* Quotations+
* Expenses+
* SwipeAI
* Products & Services
* Payments
* Customers
* Vendors
* Projects
* Insights
* Reports
* Invite Users
* Settings

---

## Warehouse Tabs

* Warehouse *(Active)*
* * Warehouse

---

## Header Actions

* Bulk Items Stock In
* Bulk Items Stock Out
* Manage Warehouses

---

## Toolbar

* Search Inventory
* Select Category
* Actions
* Information Icon

---

# 6. Cards, Panels & Components

Visible Components

* Global Header
* Sidebar Navigation
* Promotional Banner
* Warehouse Tabs
* Statistic Cards
* Search Textbox
* Category Dropdown
* Inventory Data Grid
* Product Avatar Chips
* Status Badges
* Stock Operation Buttons
* Pagination
* Promotional Upgrade Card
* Footer
* Floating WhatsApp Button
* Info Icons
* Sort Icons
* Filter Icons

---

# 7. Layout Structure

```text
Global Header
────────────────────────────────────────────────────────────────────────────

Sidebar │ Main Content
        │
        ├── Conversion Banner
        ├── Inventory Header
        ├── Warehouse Tabs
        ├── Summary Cards (4)
        ├── Search & Filter Toolbar
        ├── Inventory Table
        ├── Pagination
        ├── Add Multiple Warehouses Banner
        └── Footer
```

### Grid Layout

* **Overall:** 2-column layout (Sidebar + Main Content)
* **Header:** 4-column action layout
* **Warehouse Tabs:** 2-column
* **Summary:** 4 equal-width cards
* **Toolbar:** 4 controls
* **Table:** 7-column grid
* **Promotion Banner:** 3-column content/action layout

---

# 8. Complete Field Inventory

| Section | Row    | Column | Label                | Field Type                 |
| ------- | ------ | ------ | -------------------- | -------------------------- |
| Header  | 1      | 1      | Bulk Items Stock In  | Button                     |
| Header  | 1      | 2      | Bulk Items Stock Out | Button                     |
| Header  | 1      | 3      | Manage Warehouses    | Button                     |
| Tabs    | 1      | 1      | Warehouse            | Tab                        |
| Tabs    | 1      | 2      | + Warehouse          | Tab/Button                 |
| Toolbar | 1      | 1      | Search Inventory     | Search Textbox             |
| Toolbar | 1      | 2      | Select Category      | Dropdown                   |
| Toolbar | 1      | 3      | Actions              | Dropdown                   |
| Table   | Header | 1      | Item                 | Sortable Column            |
| Table   | Header | 2      | Qty                  | Sortable/Filterable Column |
| Table   | Header | 3      | Status               | Badge Column               |
| Table   | Header | 4      | Purchase Price       | Currency Column            |
| Table   | Header | 5      | Sale Price           | Currency Column            |
| Table   | Header | 6      | Last Updated         | Date/Time Column           |
| Table   | Header | 7      | Actions              | Action Buttons             |

---

# 9. UI Observations

### Strengths

* Inventory-specific dashboard with warehouse-focused metrics displayed prominently.
* Four summary cards provide immediate visibility into stock health and inventory valuation.
* Dedicated **Stock In** and **Stock Out** actions are available directly within each table row, enabling fast inventory adjustments.
* Premium features such as bulk stock operations and warehouse management are clearly identified with lock icons.
* Product avatars and color-coded **In Stock** badges improve readability.

### Observations

* The **Warehouse** tab is active, while **+ Warehouse** suggests inline creation of additional warehouses.
* Inventory values are presented from both **sales price** and **purchase price** perspectives, offering operational and financial insights.
* All visible items have an **In Stock** status; no low-stock or out-of-stock examples are shown.
* The promotional card for **Add Multiple Warehouses** appears after the table, encouraging upgrades without interrupting core workflows.
* The pagination controls are partially obscured by the floating WhatsApp button in the screenshot, which could slightly affect usability on smaller viewports.

---

# 10. Text Wireframe (ASCII Layout)

```text
────────────────────────────────────────────────────────────────────────────────────────────────────
swipe | MARUF DRESSES | [ Ask SwipeAI ] | ctrl+k | ⚡ 🔔 📣 👤
────────────────────────────────────────────────────────────────────────────────────────────────────

┌──────────── Sidebar ─────────────┐  ┌────────────────────────────────────────────────────────────────────┐
│ Inventory ●                      │  │ One Click to Convert Quotes → Invoices → E-Way Bills [Convert Now] │
│ ├─ Warehouses ●                  │  ├────────────────────────────────────────────────────────────────────┤
│ ├─ Timeline                      │  │ Inventory                                                         │
│ Products & Services              │  │ [Bulk Items Stock In] [Bulk Items Stock Out] [Manage Warehouses] │
│ Payments                         │  ├────────────────────────────────────────────────────────────────────┤
│ Customers                        │  │ [Warehouse] [+ Warehouse]                                        │
│ Vendors                          │  ├────────────────────────────────────────────────────────────────────┤
│ Projects                         │  │ Low Stock | Positive Stock | Sales Value | Purchase Value        │
│ Reports                          │  ├────────────────────────────────────────────────────────────────────┤
│ Invite Users                     │  │ [Search Inventory] [Select Category ▼] [Actions ▼] [ⓘ]          │
│ Settings                         │  ├────────────────────────────────────────────────────────────────────┤
│                                  │  │ Item | Qty | Status | Purchase | Sale | Last Updated | Actions  │
│ Refer a friend & Get ₹2000       │  │ CP Cotton Pant        175 PCS  In Stock   ₹171   ₹180           │
│ [ Refer Now 🚀 ]                 │  │ JM JB MENTS PANT...    80 PCS  In Stock   ₹0     ₹240           │
└──────────────────────────────────┘  │ ...                                                              │
                                      │                         [Stock In] [Stock Out]                   │
                                      ├────────────────────────────────────────────────────────────────────┤
                                      │ Add Multiple Warehouses                                           │
                                      │ [Talk to a specialist]                               [Upgrade 🚀] │
                                      └────────────────────────────────────────────────────────────────────┘

Footer:
swipe | ©2026 NextSpeed Technologies Private Limited. All rights reserved.
🔒 Data is secured via 'bank-grade' security

                                                        ● WhatsApp Floating Action Button
```

## Comparison with Related Product Pages

| Feature              | Products & Services       | Inventory                               |
| -------------------- | ------------------------- | --------------------------------------- |
| Primary Purpose      | Product master management | Live warehouse inventory management     |
| Main Entity          | Product record            | Warehouse stock                         |
| Summary Cards        | None                      | Low Stock, Positive Stock, Stock Values |
| Warehouse Support    | No                        | Yes                                     |
| Stock Operations     | No                        | Stock In / Stock Out                    |
| Bulk Operations      | No                        | Bulk Stock In / Out                     |
| Inventory Valuation  | No                        | Sales & Purchase Value                  |
| Status Badges        | No                        | In Stock                                |
| Last Updated         | No                        | Yes                                     |
| Warehouse Management | No                        | Manage Warehouses                       |



# UI Layout Analysis – Sales (Invoice List with Payment Breakdown Popover)

> **Context:** This page is the **Sales → Invoices** listing page. Compared to the earlier Sales page, this screenshot additionally shows an **expanded Payment Breakdown Popover** that appears when clicking the **"+1"** payment indicator in the **Mode** column. The analysis below covers both the base page and the visible payment popover.

---

# 1. Page Overview

### Page Title

**Sales**

### Purpose

Manage customer sales invoices by:

* Viewing all invoices
* Searching invoices
* Filtering by status and year
* Viewing payment methods
* Viewing split payments
* Sending invoices
* Opening invoice details
* Creating new invoices
* Accessing document settings

### Page Type

* Sales Dashboard
* Invoice Management
* Invoice Listing
* Payment Tracking

### Total Major Sections

1. Global Header
2. Left Sidebar Navigation
3. Promotional Banner
4. Sales Header
5. Status Tabs
6. Search & Filter Toolbar
7. Invoice Data Table
8. Payment Breakdown Popover (Visible)
9. Summary Totals
10. Pagination
11. Promotional Cards
12. Footer
13. Floating WhatsApp Button

**Total Sections: 13**

---

# 2. Section-wise Analysis

---

# Section 1 – Global Header

### Description

Application-level navigation header.

### Row 1 (5 Columns)

| Column | Label         | Field Type       |
| ------ | ------------- | ---------------- |
| 1      | swipe         | Logo             |
| 2      | MARUF DRESSES | Company Selector |
| 3      | Ask SwipeAI   | Global Search    |
| 4      | ctrl+k        | Shortcut Hint    |
| 5      | Utility Icons | Icon Buttons     |

Utility icons visible:

* Lightning
* Notification
* Announcement
* User Profile

---

# Section 2 – Left Sidebar

Expanded Module

**Sales**

Visible submenu

* Invoices
* Credit Notes
* E-Invoices
* Subscriptions

Other menus

* Purchases
* Quotations+
* Expenses+
* SwipeAI
* Products & Services
* Inventory
* Payments
* Customers
* Vendors
* Projects
* Insights
* Reports
* Invite Users
* Settings

Bottom Card

Refer a friend & Get ₹2000

Button

Refer Now 🚀

---

# Section 3 – Promotional Banner

Message

**Enjoy 15+ Templates, Remove Watermark & more**

Button

**Subscribe Now 🚀**

---

# Section 4 – Sales Header

### Row 1 (3 Columns)

| Column | Label             | Type             |
| ------ | ----------------- | ---------------- |
| 1      | Sales             | Heading          |
| 2      | Document Settings | Secondary Action |
| 3      | + Create Invoice  | Primary Button   |

---

# Section 5 – Status Tabs

### Row 1 (5 Columns)

| Column | Tab       |
| ------ | --------- |
| 1      | All (2)   |
| 2      | Pending   |
| 3      | Paid      |
| 4      | Cancelled |
| 5      | Drafts    |

Default Active

**All (2)**

---

# Section 6 – Search & Filter Toolbar

### Row 1 (4 Columns)

| Column | Label                                           | Type           |
| ------ | ----------------------------------------------- | -------------- |
| 1      | Search by transaction, customers, invoice etc.. | Search Textbox |
| 2      | This Year                                       | Dropdown       |
| 3      | Actions                                         | Dropdown       |
| 4      | Filter Icon                                     | Icon Button    |

Placeholder

**Search by transaction, customers, invoice etc..**

Default Dropdown

**This Year**

---

# Section 7 – Invoice Table

## Column Headers

| Column   |
| -------- |
| Amount   |
| Status   |
| Mode     |
| Bill #   |
| Customer |
| Date     |
| Actions  |

Header features

### Amount

* Sort
* Filter

### Status

* Filter

### Mode

* Filter

### Bill

* Sort
* Filter

### Date

* Sort

---

## Row 1

### Amount

₹2,300.00

---

### Status

paid

(Green Badge)

---

### Mode

UPI

+1

The "+1" badge indicates additional payment records.

---

### Bill

INV-158

Subtext

by Chandan

---

### Customer

SATYAM LIFESTYLE

+919668223676

---

### Date

22 Jul 2026

a few seconds ago

---

### Actions

View

Send

More (...)

---

## Row 2

Amount

₹180.00

Status

paid

Mode

(Not fully visible due to popover)

Customer

SATYAM LIFESTYLE

Date

21 Jul 2026

Yesterday, 6:02 PM

Actions

More (...)

---

# Section 8 – Payment Breakdown Popover (Expanded)

## Popover Title

**See all payments**

Purpose

Displays every payment linked to the selected invoice.

---

### Payment Row 1 (2 Columns)

#### Column 1

₹2,000.00, UPI

22-07-2026

PAYIN-9

#### Column 2

View

(Button)

---

### Payment Row 2 (2 Columns)

#### Column 1

₹300.00, Cash

22-07-2026

PAYIN-10

#### Column 2

View

(Button)

---

## Popover Components

* Popover Container
* Header
* Payment Cards
* Payment Date
* Payment Reference
* View Buttons

---

# Section 9 – Summary Totals

Three summary cards

### Card 1

Total

₹2,480.00

---

### Card 2

Paid

₹2,480.00

Information Icon

---

### Card 3

Pending

(Partially obscured in screenshot; value not fully visible.)

---

# Section 10 – Pagination

Current

1/1

Previous

Disabled

Next

Disabled

---

# Section 11 – Promotional Cards

Three cards

---

## Card 1

Bulk Upload Invoices

Description

Upload invoices at once from Excel or CSV files.

Button

Talk to Specialist →

---

## Card 2

Tally Integration

Description

Automatically sync Swipe data with Tally.

Button

Talk to Specialist →

---

## Card 3

E-Way Bills

Description

Generate and manage e-way bills effortlessly.

Button

Talk to Specialist →

---

# Section 12 – Footer

Logo

swipe

Footer

©2026 NextSpeed Technologies Private Limited.

Security

Data is secured via 'bank-grade' security

---

# Section 13 – Floating Action

WhatsApp Button

Bottom-right

---

# 3. Buttons & Actions

| Button             | Type      | Position          | Alignment |
| ------------------ | --------- | ----------------- | --------- |
| Subscribe Now 🚀   | Primary   | Banner            | Center    |
| Document Settings  | Secondary | Header            | Right     |
| + Create Invoice   | Primary   | Header            | Right     |
| Actions            | Dropdown  | Toolbar           | Right     |
| Filter             | Icon      | Toolbar           | Right     |
| View               | Secondary | Table             | Right     |
| Send               | Success   | Table             | Right     |
| More (...)         | Icon      | Table             | Right     |
| View               | Secondary | Payment Popover   | Right     |
| View               | Secondary | Payment Popover   | Right     |
| Talk to Specialist | Secondary | Promotional Cards | Left      |
| Refer Now 🚀       | Primary   | Sidebar           | Left      |
| WhatsApp           | Floating  | Bottom Right      | Floating  |

---

# 4. Tables

## Invoice Table

### Columns

1. Amount
2. Status
3. Mode
4. Bill #
5. Customer
6. Date
7. Actions

### Available Features

| Feature         | Available |
| --------------- | --------- |
| Search          | ✔         |
| Year Filter     | ✔         |
| Sorting         | ✔         |
| Column Filters  | ✔         |
| Status Badges   | ✔         |
| Pagination      | ✔         |
| Payment Popover | ✔         |
| View            | ✔         |
| Send            | ✔         |
| More Menu       | ✔         |

### Row Selection

Not Visible

### Bulk Actions

Not Visible

---

# 5. Navigation Elements

## Sidebar

Sales

* Invoices
* Credit Notes
* E-Invoices
* Subscriptions

Other modules

* Purchases
* Quotations+
* Expenses+
* SwipeAI
* Products & Services
* Inventory
* Payments
* Customers
* Vendors
* Projects
* Insights
* Reports

---

## Page Tabs

* All
* Pending
* Paid
* Cancelled
* Drafts

---

## Header Actions

* Document Settings
* Create Invoice

---

## Toolbar

* Search
* This Year
* Actions
* Filter

---

# 6. Cards, Panels & Components

Visible Components

* Global Header
* Sidebar
* Promotional Banner
* Sales Header
* Status Tabs
* Search Box
* Year Dropdown
* Invoice Table
* Status Badges
* Payment Badge (+1)
* Payment Popover
* Payment Cards
* Summary Cards
* Promotional Cards
* Footer
* Floating WhatsApp Button
* Filter Icons
* Sort Icons

---

# 7. Layout Structure

```text
Global Header
──────────────────────────────────────────────────────────────

Sidebar │ Main Content
        │
        ├── Promotion Banner
        ├── Sales Header
        ├── Status Tabs
        ├── Search Toolbar
        ├── Invoice Table
        │      └── Payment Popover (Expanded)
        ├── Summary Cards
        ├── Promotional Cards
        ├── Footer
        └── WhatsApp Floating Button
```

### Grid Layout

* Overall: 2-column (Sidebar + Main Content)
* Header: 3-column
* Toolbar: 4-column
* Invoice Table: 7-column
* Payment Popover: 2-column rows
* Summary Cards: 3-column
* Promotional Cards: 3-column

---

# 8. Complete Field Inventory

| Section | Row    | Column | Label                                           | Field Type     |
| ------- | ------ | ------ | ----------------------------------------------- | -------------- |
| Header  | 1      | 1      | Document Settings                               | Action         |
| Header  | 1      | 2      | + Create Invoice                                | Button         |
| Tabs    | 1      | 1      | All                                             | Tab            |
| Tabs    | 1      | 2      | Pending                                         | Tab            |
| Tabs    | 1      | 3      | Paid                                            | Tab            |
| Tabs    | 1      | 4      | Cancelled                                       | Tab            |
| Tabs    | 1      | 5      | Drafts                                          | Tab            |
| Toolbar | 1      | 1      | Search by transaction, customers, invoice etc.. | Search         |
| Toolbar | 1      | 2      | This Year                                       | Dropdown       |
| Toolbar | 1      | 3      | Actions                                         | Dropdown       |
| Toolbar | 1      | 4      | Filter                                          | Icon           |
| Table   | Header | 1      | Amount                                          | Sortable       |
| Table   | Header | 2      | Status                                          | Badge          |
| Table   | Header | 3      | Mode                                            | Payment Mode   |
| Table   | Header | 4      | Bill #                                          | Sortable       |
| Table   | Header | 5      | Customer                                        | Text           |
| Table   | Header | 6      | Date                                            | Date           |
| Table   | Header | 7      | Actions                                         | Buttons        |
| Popover | 1      | 1      | ₹2,000.00, UPI                                  | Payment Record |
| Popover | 1      | 2      | View                                            | Button         |
| Popover | 2      | 1      | ₹300.00, Cash                                   | Payment Record |
| Popover | 2      | 2      | View                                            | Button         |

---

# 9. UI Observations

### Strengths

* The payment breakdown is accessible directly from the invoice list via the **"+1"** indicator, avoiding navigation to a separate page.
* The popover clearly displays **payment amount**, **payment mode**, **payment date**, and **payment reference number (PAYIN-9 / PAYIN-10)** for split-payment invoices.
* Consistent color coding differentiates payment entries (e.g., lavender for UPI, green for Cash), improving scanability.
* Invoice actions (**View**, **Send**, **More**) remain available while the payment popover is open.

### Observations

* The payment popover overlays the second table row, partially obscuring its **Mode** value and reducing visibility of underlying content.
* The **+1** badge serves as a compact indicator that multiple payment transactions are associated with a single invoice.
* The popover behaves like a lightweight drill-down panel rather than a full modal, enabling quick inspection without leaving the listing page.
* Summary totals remain visible beneath the table, preserving overall sales context even when the popover is expanded.

---

# 10. Text Wireframe (ASCII Layout)

```text
────────────────────────────────────────────────────────────────────────────────────────────────────
swipe | MARUF DRESSES | [ Ask SwipeAI ] | ctrl+k | ⚡ 🔔 📣 👤
────────────────────────────────────────────────────────────────────────────────────────────────────

┌──────────── Sidebar ────────────┐   ┌──────────────────────────────────────────────────────────────┐
│ Sales                           │   │ Enjoy 15+ Templates, Remove Watermark & more [Subscribe Now] │
│ ├─ Invoices ●                   │   ├──────────────────────────────────────────────────────────────┤
│ ├─ Credit Notes                 │   │ Sales                     [Document Settings] [Create Invoice]│
│ ├─ E-Invoices                   │   ├──────────────────────────────────────────────────────────────┤
│ ├─ Subscriptions                │   │ All | Pending | Paid | Cancelled | Drafts                   │
│ Purchases                       │   ├──────────────────────────────────────────────────────────────┤
│ Products & Services             │   │ [Search................] [This Year▼] [Actions▼] [Filter]   │
│ Inventory                       │   ├──────────────────────────────────────────────────────────────┤
│ Payments                        │   │ Amount | Status | Mode | Bill # | Customer | Date | Actions │
│ Customers                       │   │ ₹2300 | Paid | UPI +1 | INV-158 | SATYAM... | 22 Jul | ...  │
│ Settings                        │   │                ┌────────────────────────────────────┐         │
│                                  │   │                │ See all payments                  │         │
│ Refer a friend & Get ₹2000       │   │                │ ₹2,000.00 UPI      [View]         │         │
│ [Refer Now 🚀]                   │   │                │ PAYIN-9                           │         │
└──────────────────────────────────┘   │                │ ₹300.00 Cash      [View]          │         │
                                       │                │ PAYIN-10                          │         │
                                       │                └────────────────────────────────────┘         │
                                       ├──────────────────────────────────────────────────────────────┤
                                       │ Total ₹2,480 | Paid ₹2,480 | Pending ...                    │
                                       ├──────────────────────────────────────────────────────────────┤
                                       │ Bulk Upload | Tally Integration | E-Way Bills               │
                                       └──────────────────────────────────────────────────────────────┘

Footer:
swipe | ©2026 NextSpeed Technologies Private Limited.
🔒 Data is secured via 'bank-grade' security

                                                        ● WhatsApp Floating Action Button
```

## Additional Component Introduced in This Screenshot

| Component                        | Purpose                                                                                                         |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Payment Breakdown Popover**    | Displays all payment transactions associated with an invoice.                                                   |
| **Payment Record Card**          | Shows payment amount, payment mode, payment date, payment reference, and a **View** action.                     |
| **Split Payment Indicator (+1)** | Indicates that the invoice has multiple payment records beyond the primary payment mode displayed in the table. |



# UI Layout Analysis – Invoice Details Side Drawer (Invoice # INV-158)

> **Context:** This screenshot shows the **Invoice Details** side drawer that opens from the **Sales → Invoice List** after clicking the **View** action. It is a **right-side slide-over panel** displayed above the invoice listing page, allowing users to review invoice information without navigating away.

---

# 1. Page Overview

### Page Title

**Invoice # INV-158**

### Purpose

Display complete invoice details, including:

* Customer information
* Invoice summary
* Invoice line items
* Tax breakdown
* Payment details
* Bank information
* Signature
* Internal notes
* Attachments
* Send invoice

### Page Type

* Right Slide Drawer
* Invoice Details Panel
* Read/View Mode
* Invoice Preview

### Total Major Sections

1. Drawer Header
2. Navigation Tab
3. Customer Summary Card
4. Invoice Items Table
5. Invoice Totals Summary
6. Payments Section
7. Bank Information
8. Signature Section
9. Internal Notes
10. Attachments Upload
11. Background Sales Page (Dimmed)

**Total Sections: 11**

---

# 2. Section-wise Analysis

---

# Section 1 – Drawer Header

### Description

Top action bar of the side drawer.

### Row 1 (4 Columns)

| Column | Label             | Field Type            |
| ------ | ----------------- | --------------------- |
| 1      | ✕                 | Close Icon            |
| 2      | Invoice # INV-158 | Page Title            |
| 3      | Send              | Primary Action Button |
| 4      | ⋯                 | More Menu             |

---

# Section 2 – Navigation Tabs

### Row 1 (1 Column)

| Column | Label   | Type       |
| ------ | ------- | ---------- |
| 1      | Details | Active Tab |

Active Tab

**Details**

---

# Section 3 – Customer Summary Card

### Description

Displays invoice recipient and high-level invoice information.

### Row 1 (5 Columns)

| Column | Label                   | Type            |
| ------ | ----------------------- | --------------- |
| 1      | SL                      | Customer Avatar |
| 2      | SATYAM LIFESTYLE        | Customer Name   |
| 3      | Invoice Date 22-07-2026 | Read-only Label |
| 4      | Due Date 22-07-2026     | Read-only Label |
| 5      | More >                  | Navigation Link |

---

### Row 2 (1 Column)

| Column | Label     |
| ------ | --------- |
| 1      | ₹2,300.00 |

Large invoice amount.

---

# Section 4 – Invoice Items Table

## Table Title

(No visible title)

---

### Column Headers

| Column       |
| ------------ |
| Product Name |
| Quantity     |
| Unit Price   |
| Net Amount   |
| Total        |

---

### Visible Row

#### Product Name

JB MENS PANT 34 SIZE

Subtext

* HSN/SAC

---

#### Quantity

10.0 PCS

---

#### Unit Price

219.05

Discount (%)

(blank)

---

#### Net Amount

2,190.48

Tax (%)

109.52 (5%)

---

#### Total

2,300.00

---

# Section 5 – Invoice Totals Summary

Appears on right beneath the product table.

### Row 1

Taxable Amount

₹2,190.48

---

### Row 2

Tax Amount

₹109.52

---

### Row 3

Total Amount

₹2,300.00

(Bold)

---

### Divider

---

### Row 4

Amount Paid

₹2,300.00

---

### Row 5

Amount Pending

₹0.00

---

# Section 6 – Payments

### Description

Displays payment methods used.

### Row 1 (4 Columns)

| Column | Label        |
| ------ | ------------ |
| 1      | Payments     |
| 2      | UPI          |
| 3      | Cash         |
| 4      | View Receipt |

Payment methods are displayed as colored chips.

---

# Section 7 – Bank

### Row 1 (3 Columns)

| Column | Label                          | Type        |
| ------ | ------------------------------ | ----------- |
| 1      | Bank                           | Label       |
| 2      | Edit Icon                      | Icon Button |
| 3      | IDFC First Bank Limited (8520) | Dropdown    |

Default Value

IDFC First Bank Limited (8520)

---

# Section 8 – Signature

### Row 1 (3 Columns)

| Column | Label      |
| ------ | ---------- |
| 1      | Signature  |
| 2      | Edit Icon  |
| 3      | Empty Area |

No signature visible.

---

# Section 9 – Internal Notes

### Row 1 (3 Columns)

| Column | Label          |
| ------ | -------------- |
| 1      | Internal Notes |
| 2      | Edit Icon      |
| 3      | Empty Area     |

No notes displayed.

---

# Section 10 – Attachments

### Description

Upload supporting documents.

---

### Row 1 (1 Column)

Heading

Attachments

Information Icon

---

### Row 2 (1 Column)

Upload Area

Drag and drop here or click to upload (Max: 5)

Supported Files

PDF

PNG

JPEG

---

# Section 11 – Background Page

Dimmed Sales List

Visible beneath overlay.

Not interactive.

---

# 3. Buttons & Actions

| Button              | Type        | Position           | Alignment |
| ------------------- | ----------- | ------------------ | --------- |
| ✕                   | Icon        | Header             | Left      |
| Send                | Primary     | Header             | Right     |
| ⋯                   | More Menu   | Header             | Right     |
| More >              | Link        | Customer Card      | Right     |
| View Receipt        | Secondary   | Payments           | Right     |
| Edit Bank           | Icon        | Bank Row           | Right     |
| Edit Signature      | Icon        | Signature Row      | Right     |
| Edit Internal Notes | Icon        | Internal Notes Row | Right     |
| Upload Attachment   | Upload Area | Attachments        | Center    |

---

# 4. Tables

## Invoice Items Table

### Column Headers

1. Product Name
2. Quantity
3. Unit Price
4. Net Amount
5. Total

---

### Features

| Feature        | Available |
| -------------- | --------- |
| Row Selection  | ✖         |
| Search         | ✖         |
| Sorting        | ✖         |
| Filters        | ✖         |
| Pagination     | ✖         |
| Inline Editing | ✖         |
| Totals         | ✔         |

---

# 5. Navigation Elements

### Drawer Header

* Close
* Invoice # INV-158
* Send
* More

---

### Tabs

* Details (Active)

---

### Internal Navigation

* More >

---

# 6. Cards, Panels & Components

Visible Components

* Right Side Drawer
* Header Bar
* Customer Summary Card
* Product Table
* Amount Summary
* Payment Chips
* Bank Dropdown
* Signature Panel
* Internal Notes Panel
* Attachment Upload Zone
* Edit Icons
* More Menu
* Receipt Button

---

# 7. Layout Structure

```text
Background Sales Page (Dimmed)
──────────────────────────────────────────────

                 Right Side Drawer
┌─────────────────────────────────────────────┐
│ Header                                      │
├─────────────────────────────────────────────┤
│ Details Tab                                 │
├─────────────────────────────────────────────┤
│ Customer Summary Card                       │
├─────────────────────────────────────────────┤
│ Invoice Product Table                       │
│                    Totals Summary           │
├─────────────────────────────────────────────┤
│ Payments                                    │
├─────────────────────────────────────────────┤
│ Bank                                        │
├─────────────────────────────────────────────┤
│ Signature                                   │
├─────────────────────────────────────────────┤
│ Internal Notes                              │
├─────────────────────────────────────────────┤
│ Attachments Upload                          │
└─────────────────────────────────────────────┘
```

---

# 8. Complete Field Inventory

| Section     | Row    | Column | Label                                          | Field Type  |
| ----------- | ------ | ------ | ---------------------------------------------- | ----------- |
| Header      | 1      | 1      | ✕                                              | Icon        |
| Header      | 1      | 2      | Invoice # INV-158                              | Title       |
| Header      | 1      | 3      | Send                                           | Button      |
| Header      | 1      | 4      | ⋯                                              | Menu        |
| Tabs        | 1      | 1      | Details                                        | Tab         |
| Customer    | 1      | 2      | SATYAM LIFESTYLE                               | Read-only   |
| Customer    | 1      | 3      | Invoice Date                                   | Read-only   |
| Customer    | 1      | 4      | Due Date                                       | Read-only   |
| Customer    | 2      | 1      | ₹2,300.00                                      | Amount      |
| Items       | Header | 1      | Product Name                                   | Column      |
| Items       | Header | 2      | Quantity                                       | Column      |
| Items       | Header | 3      | Unit Price                                     | Column      |
| Items       | Header | 4      | Net Amount                                     | Column      |
| Items       | Header | 5      | Total                                          | Column      |
| Payments    | 1      | 2      | UPI                                            | Chip        |
| Payments    | 1      | 3      | Cash                                           | Chip        |
| Payments    | 1      | 4      | View Receipt                                   | Button      |
| Bank        | 1      | 3      | IDFC First Bank Limited (8520)                 | Dropdown    |
| Attachments | 2      | 1      | Drag and drop here or click to upload (Max: 5) | File Upload |

---

# 9. UI Observations

### Strengths

* Uses a **non-blocking right-side drawer**, allowing users to inspect invoice details while retaining context of the invoice list in the background.
* Customer summary card presents the most important information (customer, invoice date, due date, total amount) at the top.
* Financial summary is clearly separated into **Taxable Amount**, **Tax Amount**, **Total Amount**, **Amount Paid**, and **Amount Pending**.
* Payment methods are displayed as colored chips (**UPI**, **Cash**) alongside a **View Receipt** action.
* Attachment area supports drag-and-drop uploads with supported file types explicitly stated.

### Observations

* The **Details** tab is the only visible tab in this screenshot, suggesting additional tabs may exist in other contexts.
* **Bank**, **Signature**, and **Internal Notes** include edit icons, but no editable controls are expanded.
* Signature and Internal Notes sections are empty, functioning as placeholders until data is added.
* The product table is optimized for read-only viewing, with no sorting, filtering, or inline editing controls.
* The dimmed background reinforces that this is a slide-over drawer rather than a separate page.

---

# 10. Text Wireframe (ASCII Layout)

```text
Background Sales Page (Dimmed)
────────────────────────────────────────────────────────────────────────────

┌───────────────────────────────────────────────────────────────────────────┐
│ ✕  Invoice # INV-158                                 [Send] [⋯]          │
├───────────────────────────────────────────────────────────────────────────┤
│ Details                                                           (Active)│
├───────────────────────────────────────────────────────────────────────────┤
│ (SL) SATYAM LIFESTYLE      Invoice Date: 22-07-2026   Due Date: 22-07-2026│
│ ₹2,300.00                                                    More >       │
├───────────────────────────────────────────────────────────────────────────┤
│ Product Name         Qty      Unit Price   Net Amount        Total         │
│ JB MENS PANT 34 SIZE 10 PCS   219.05       2,190.48          2,300.00      │
│ + HSN/SAC                                                             │
├───────────────────────────────────────────────────────────────────────────┤
│ Taxable Amount                                    ₹2,190.48              │
│ Tax Amount                                        ₹109.52                │
│ Total Amount                                      ₹2,300.00              │
│ ---------------------------------------------------------------          │
│ Amount Paid                                       ₹2,300.00              │
│ Amount Pending                                    ₹0.00                  │
├───────────────────────────────────────────────────────────────────────────┤
│ Payments     [UPI] [Cash]                              [View Receipt]     │
├───────────────────────────────────────────────────────────────────────────┤
│ Bank            ✎   [IDFC First Bank Limited (8520) ▼]                   │
├───────────────────────────────────────────────────────────────────────────┤
│ Signature       ✎                                                   (Empty)│
├───────────────────────────────────────────────────────────────────────────┤
│ Internal Notes  ✎                                                   (Empty)│
├───────────────────────────────────────────────────────────────────────────┤
│ Attachments                                                         ⓘ      │
│ ┌───────────────────────────────────────────────────────────────────────┐ │
│ │ Drag and drop here or click to upload (Max: 5)                       │ │
│ │ Supported: PDF, PNG, JPEG                                            │ │
│ └───────────────────────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────────────────┘
```

## Additional Components Introduced in This Screenshot

| Component                       | Purpose                                                                              |
| ------------------------------- | ------------------------------------------------------------------------------------ |
| **Invoice Details Side Drawer** | Displays complete invoice information without leaving the invoice list.              |
| **Customer Summary Card**       | Highlights customer identity, invoice dates, and invoice total.                      |
| **Invoice Totals Panel**        | Shows tax calculation, paid amount, and pending balance.                             |
| **Payment Method Chips**        | Indicates all payment methods used for the invoice.                                  |
| **Bank Selector**               | Displays the associated bank account for the transaction.                            |
| **View Receipt Button**         | Opens the payment receipt for the recorded transaction.                              |
| **Attachment Upload Zone**      | Allows supporting documents (PDF, PNG, JPEG) to be uploaded directly to the invoice. |



# UI Layout Analysis – Payments Timeline

---

# 1. Page Overview

### Page Title

**Payments Timeline**

### Purpose

The **Payments Timeline** page provides a centralized ledger of all payment transactions. It allows users to:

* View payment history
* Monitor available funds
* Track payment modes
* View linked invoices/documents
* Filter payments by status and date
* Edit payment entries
* Delete payment entries
* Review payment balances

### Page Type

* Dashboard + Data Listing
* Payment Ledger
* Transaction Timeline

### Total Major Sections

1. Top Promotional Banner
2. Page Header
3. Summary Cards
4. Status Tabs
5. Search & Filter Toolbar
6. Payments Timeline Table
7. Summary Footer
8. Pagination
9. Sidebar Navigation
10. Global Header

**Total Sections:** **10**

---

# 2. Section-wise Analysis

---

# Section 1 – Promotional Banner

Located below global header.

### Row 1 (2 Columns)

| Column | Component                                            | Type               |
| ------ | ---------------------------------------------------- | ------------------ |
| 1      | One Click to Convert Quotes → Invoices → E-Way Bills | Information Banner |
| 2      | Convert Now                                          | CTA Button         |

---

# Section 2 – Page Header

### Row 1 (1 Column)

| Column | Label             |
| ------ | ----------------- |
| 1      | Payments Timeline |

---

# Section 3 – Summary Cards

Three KPI cards are displayed.

---

## Row 1 (3 Columns)

### Column 1

**Total Available Funds**

Type:

Information Card

Displayed Value

₹27.2K

Icons

Wallet Icon

Settings Icon

---

### Column 2

**Cash**

Type

Summary Card

Value

₹23.66K

---

### Column 3

**IDFC First Bank Limi**

Subtext

xxxx8520

Value

₹3.53K

---

# Section 4 – Status Tabs

## Row 1 (3 Columns)

| Column | Label                | Type       |
| ------ | -------------------- | ---------- |
| 1      | Success              | Active Tab |
| 2      | Cancelled            | Tab        |
| 3      | Waiting for Approval | Tab        |

---

# Section 5 – Search & Filter Toolbar

## Row 1 (4 Columns)

### Column 1

Search Payment

Type

Search Textbox

Placeholder

Search payment, party name, amount etc...

---

### Column 2

Date Range

Type

Dropdown

Default

1 Jan, 2026 - 31 Dec, 2026

---

### Column 3

More Options

Type

Overflow Menu

Icon

⋯

---

### Column 4

(Empty)

---

# Section 6 – Payments Timeline Table

## Table Title

Payments Timeline

---

## Table Header

| Column           |
| ---------------- |
| Amount           |
| Mode             |
| Linked Documents |
| Party Name       |
| Date             |
| Bank Details     |
| Created By       |
| Actions          |

Sorting icons are visible on:

* Amount

Filter icons visible on:

* Amount
* Mode
* Linked Documents
* Party Name
* Bank Details
* Created By

---

## Visible Rows

### Row 1

Amount

₹300.00

Mode

Cash

Linked Document

INV-158

Party

SATYAM LIFESTYLE

Phone

9668223676

Date

22-07-2026

Subtext

4 minutes ago

Bank

Cash

Created By

Chandan

Actions

* View
* Edit
* Delete

---

### Row 2

Amount

₹2,000.00

Mode

UPI

Linked Document

INV-158

Party

SATYAM LIFESTYLE

Phone

9668223676

Date

22-07-2026

Bank

IDFC First Bank Limited

Subtext

A/C NO: 8520

Created By

Chandan

Actions

Delete

---

### Row 3

Amount

₹80.00

Mode

Cash

Linked Document

INV-157

Party

SATYAM LIFESTYLE

Phone

9668223676

Date

21-07-2026

Subtext

Yesterday, 6:02 PM

Bank

Cash

Created By

Chandan

Actions

Delete

---

# Section 7 – Summary Footer

Displayed below table.

## Row 1 (4 Columns)

| Column | Label                |
| ------ | -------------------- |
| 1      | Net Balance ₹2,380   |
| 2      | You Received: ₹2,380 |
| 3      | You Gave: ₹0         |
| 4      | View Total Breakdown |

---

# Section 8 – Pagination

## Row 1 (3 Columns)

| Column | Component |
| ------ | --------- |
| 1      | 1/1       |
| 2      | Previous  |
| 3      | Next      |

---

# Section 9 – Sidebar Navigation

Expanded **Payments** menu.

Visible items

* Payments
* Timeline (Active)
* Payment Links
* Journals
* Bank Reconciliation

Other navigation

* Sales
* Purchases
* Quotations+
* Expenses+
* SwipeAI
* Products & Services
* Inventory
* Customers
* Vendors
* Projects
* Insights
* Reports
* Invite Users
* Settings

---

# Section 10 – Global Header

Visible elements

* Company Logo
* Company Name
* Change Company
* Search
* Notification
* Lightning Icon
* Speaker Icon
* User Icon

---

# 3. Buttons & Actions

| Button               | Type        | Position     | Alignment |
| -------------------- | ----------- | ------------ | --------- |
| Convert Now          | Primary CTA | Banner       | Center    |
| View                 | Secondary   | Table Row    | Right     |
| Edit                 | Secondary   | Table Row    | Right     |
| Delete               | Danger Icon | Table Row    | Right     |
| View Total Breakdown | Link        | Footer       | Left      |
| Previous             | Pagination  | Bottom Right | Right     |
| Next                 | Pagination  | Bottom Right | Right     |
| Overflow Menu (⋯)    | Icon        | Toolbar      | Right     |

---

# 4. Tables

## Payments Timeline Table

### Column Headers

1. Amount
2. Mode
3. Linked Documents
4. Party Name
5. Date
6. Bank Details
7. Created By
8. Actions

---

### Search

✔ Present

Placeholder

Search payment, party name, amount etc...

---

### Filters

* Date Range
* Column Filters
* Overflow Menu

---

### Sorting

Visible

* Amount

---

### Row Selection

Not visible

---

### Bulk Actions

Not visible

---

### Pagination

Present

---

### Status Badges

* Cash
* UPI

---

# 5. Navigation Elements

## Sidebar

Payments expanded

Timeline active

---

## Tabs

* Success
* Cancelled
* Waiting for Approval

---

## Toolbar

* Search
* Date Range
* More Menu

---

# 6. Cards, Panels & Components

Visible Components

* Promotional Banner
* KPI Cards
* Status Tabs
* Search Box
* Date Dropdown
* Payments Table
* Payment Chips
* Summary Chips
* Pagination
* Sidebar
* Header
* Footer Summary
* Overflow Menu
* Delete Icon
* View Button
* Edit Button

---

# 7. Layout Structure

```text
Global Header
────────────────────────────────────────────────────────

Promo Banner

Payments Timeline

┌────────────┬────────────┬────────────┐
│ Funds      │ Cash       │ Bank       │
└────────────┴────────────┴────────────┘

Tabs

Search | Date | More

──────────────────────────────────────────

Payments Table

Amount
Mode
Linked Documents
Party
Date
Bank
Created By
Actions

──────────────────────────────────────────

Summary Chips

Pagination
```

---

# 8. Complete Field Inventory

| Section | Row    | Column | Label                                     | Field Type     |
| ------- | ------ | ------ | ----------------------------------------- | -------------- |
| Summary | 1      | 1      | Total Available Funds                     | Summary Card   |
| Summary | 1      | 2      | Cash                                      | Summary Card   |
| Summary | 1      | 3      | IDFC First Bank Limi                      | Summary Card   |
| Tabs    | 1      | 1      | Success                                   | Tab            |
| Tabs    | 1      | 2      | Cancelled                                 | Tab            |
| Tabs    | 1      | 3      | Waiting for Approval                      | Tab            |
| Toolbar | 1      | 1      | Search payment, party name, amount etc... | Search Textbox |
| Toolbar | 1      | 2      | 1 Jan, 2026 - 31 Dec, 2026                | Date Dropdown  |
| Table   | Header | 1      | Amount                                    | Column         |
| Table   | Header | 2      | Mode                                      | Column         |
| Table   | Header | 3      | Linked Documents                          | Column         |
| Table   | Header | 4      | Party Name                                | Column         |
| Table   | Header | 5      | Date                                      | Column         |
| Table   | Header | 6      | Bank Details                              | Column         |
| Table   | Header | 7      | Created By                                | Column         |
| Table   | Header | 8      | Actions                                   | Action Column  |

---

# 9. UI Observations

### Strengths

* KPI cards at the top provide an immediate overview of available funds, cash on hand, and bank balances.
* The **Success**, **Cancelled**, and **Waiting for Approval** tabs enable quick filtering by transaction status.
* Search and date-range filters are positioned prominently above the table for efficient record retrieval.
* The payment table combines transaction details, linked documents, party information, bank details, creator, and actions in a single view.
* Footer summary chips (**Net Balance**, **You Received**, **You Gave**) give a concise financial snapshot.

### Observations

* The third summary card title is visually truncated as **"IDFC First Bank Limi"**, likely due to limited card width.
* Only the first payment row exposes **View** and **Edit** actions, while subsequent rows show only **Delete**, suggesting row-specific permissions or hover-dependent controls.
* No row selection checkboxes or bulk action toolbar are visible.
* Column filter icons appear for multiple headers, but only the **Amount** column visibly includes a sort indicator.
* Footer summary values are presented as chips rather than a dedicated summary table, keeping the layout compact.

---

# 10. Text Wireframe (ASCII Layout)

```text
────────────────────────────────────────────────────────────────────────────
                           PAYMENTS TIMELINE
────────────────────────────────────────────────────────────────────────────

┌─────────────────────┬─────────────────────┬─────────────────────────────┐
│ Total Available     │ Cash                │ IDFC First Bank Limi        │
│ Funds               │ ₹23.66K             │ xxxx8520                    │
│ ₹27.2K              │                     │ ₹3.53K                      │
└─────────────────────┴─────────────────────┴─────────────────────────────┘

[ Success ] [ Cancelled ] [ Waiting for Approval ]

┌──────────────────────────────┬──────────────────────────┬──────────────┐
│ Search payment...            │ 1 Jan, 2026-31 Dec,2026 ▼│      ⋯       │
└──────────────────────────────┴──────────────────────────┴──────────────┘

────────────────────────────────────────────────────────────────────────────
Amount | Mode | Linked Documents | Party | Date | Bank | Created By | Actions
────────────────────────────────────────────────────────────────────────────
₹300.00 | Cash | INV-158 | SATYAM LIFESTYLE | 22-07-2026 | Cash | Chandan |
                                                    [View] [Edit] [Delete]

₹2,000.00 | UPI | INV-158 | SATYAM LIFESTYLE | 22-07-2026 |
IDFC First Bank Limited (A/C NO: 8520) | Chandan | [Delete]

₹80.00 | Cash | INV-157 | SATYAM LIFESTYLE | 21-07-2026 | Cash |
Chandan | [Delete]

────────────────────────────────────────────────────────────────────────────

[ Net Balance ₹2,380 ] [ You Received ₹2,380 ] [ You Gave ₹0 ]
View Total Breakdown

                                              Page 1/1   ◀   ▶
```

### Distinctive UI Components on This Page

| Component                   | Purpose                                                                            |
| --------------------------- | ---------------------------------------------------------------------------------- |
| **Financial Summary Cards** | Display available funds, cash balance, and bank balance at a glance.               |
| **Status Filter Tabs**      | Switch between successful, cancelled, and pending approval payment records.        |
| **Payments Timeline Table** | Central ledger of payment transactions with linked invoices and party information. |
| **Mode Badges**             | Visually distinguish payment methods such as **Cash** and **UPI**.                 |
| **Linked Document Column**  | Connects each payment to its originating invoice (e.g., **INV-158**).              |
| **Footer Financial Chips**  | Summarize net balance, received amount, and paid amount without leaving the page.  |




# UI Layout Analysis – Customers

---

# 1. Page Overview

### Page Title

**Customers**

### Purpose

The **Customers** page is used to manage customer records, outstanding balances, and customer-related actions. It allows users to:

* View all customers
* Search customers
* Filter by customer status/category (All, Groups, Deleted)
* View outstanding receivables/payables
* Open customer ledger
* Edit customer information
* Create a new customer
* Access customer import functionality

### Page Type

* Master Data Management
* Customer Directory
* Customer Ledger Overview

### Total Major Sections

1. Global Header
2. Sidebar Navigation
3. Page Header
4. Customer Tabs
5. Search & Action Toolbar
6. Customers Table
7. Balance Summary Chips
8. Customer/Vendor Import Banner
9. Pagination
10. Footer

**Total Sections:** **10**

---

# 2. Section-wise Analysis

---

# Section 1 – Page Header

## Row 1 (1 Column)

| Column | Component | Type       |
| ------ | --------- | ---------- |
| 1      | Customers | Page Title |

---

# Section 2 – Customer Tabs

Located below page title.

## Row 1 (3 Columns)

| Column | Label             | Type       |
| ------ | ----------------- | ---------- |
| 1      | All Customers (4) | Active Tab |
| 2      | Groups            | Tab        |
| 3      | Deleted           | Tab        |

---

# Section 3 – Search & Action Toolbar

## Row 1 (3 Columns)

### Column 1

**Search Customers**

* Type: Search Textbox
* Placeholder:
  **Search customers by name, company, phone etc..**

---

### Column 2

**Actions**

* Type: Dropdown Button

---

### Column 3

**+ New Customer**

* Type: Primary Button

---

# Section 4 – Customers Table

## Table Title

Customer List

---

## Table Header

| Column          |
| --------------- |
| Name            |
| Contact Info    |
| Closing Balance |
| Notes           |
| Actions         |

Visible features

* Sorting icon on **Name**
* Filter icon beside **Name**
* Sorting icon on **Closing Balance**

---

## Visible Data Rows

### Row 1

**Name**

* RA (Avatar)
* ratan

**Contact Info**

* Empty

**Closing Balance**

* ₹180.00
* You Collect

**Notes**

* Created: 06 Jan 24, 05:02 PM
* by Chandan

**Actions**

* Ledger
* Edit
* More (⋯)

---

### Row 2

**Name**

* SL
* SATYAM LIFESTYLE

**Contact Info**

* 9668223676
* WhatsApp Icon

**Closing Balance**

* ₹14,810.00
* You Collect

**Notes**

* Created: 20 Nov 23, 03:06 PM
* by Chandan

**Actions**

* More (⋯)

---

### Row 3

**Name**

* CH
* chandu

**Contact Info**

* 7809789178
* WhatsApp Icon

**Closing Balance**

* ₹0.00

**Notes**

* Created: 08 Apr 23, 02:53 AM

**Actions**

* More (⋯)

---

### Row 4

**Name**

* SW
* Swati

**Contact Info**

* 9114949151
* WhatsApp Icon

**Closing Balance**

* ₹0.00

**Notes**

* Created: 08 Apr 23, 02:21 AM

**Actions**

* More (⋯)

---

# Section 5 – Balance Summary

Displayed below the table.

## Row 1 (2 Columns)

### Column 1

**You Pay ₹0.00**

Type

Summary Chip

---

### Column 2

**You Collect ₹14,990.00**

Type

Summary Chip

---

# Section 6 – Customer/Vendor Import Banner

Blue promotional panel.

## Row 1 (3 Columns)

### Column 1

Heading

**Customer/ Vendor Import**

Description

**Upload a list of new customers and vendors or update existing data easily.**

---

### Column 2

Premium promotion

**Guru and lakhs of businesses use premium**

---

### Column 3

Buttons

* Talk to a specialist
* Upgrade 🚀

---

# Section 7 – Pagination

## Row 1 (3 Columns)

| Column | Component |
| ------ | --------- |
| 1      | 1/1       |
| 2      | Previous  |
| 3      | Next      |

---

# Section 8 – Sidebar Navigation

Visible menu items

* Sales
* Purchases
* Quotations+
* Expenses+
* SwipeAI
* Products & Services
* Inventory
* Payments
* **Customers** (Active)
* Vendors
* Projects
* Insights
* Reports
* OnlineStore
* E-way Bills
* Invite Users
* Settings

---

# Section 9 – Global Header

Visible items

* Swipe Logo
* Company Name
* Change Company
* Global Search
* Notification Icons
* User Profile

---

# 3. Buttons & Actions

| Button               | Type       | Position      | Alignment |
| -------------------- | ---------- | ------------- | --------- |
| Actions              | Dropdown   | Toolbar       | Right     |
| + New Customer       | Primary    | Toolbar       | Right     |
| Ledger               | Secondary  | Row 1         | Right     |
| Edit                 | Secondary  | Row 1         | Right     |
| More (⋯)             | Icon       | Every Row     | Right     |
| Talk to a specialist | Secondary  | Import Banner | Right     |
| Upgrade 🚀           | Primary    | Import Banner | Right     |
| Previous             | Pagination | Bottom Right  | Right     |
| Next                 | Pagination | Bottom Right  | Right     |

---

# 4. Tables

## Customer Table

### Column Headers

1. Name
2. Contact Info
3. Closing Balance
4. Notes
5. Actions

---

### Search

Present

Placeholder

**Search customers by name, company, phone etc..**

---

### Filters

Visible

* Name Filter

---

### Sorting

Visible

* Name
* Closing Balance

---

### Bulk Actions

Not visible

---

### Row Selection

Not visible

---

### Pagination

Present

---

### Status Badges

Receivable indicator:

* **You Collect**

---

# 5. Navigation Elements

## Sidebar

Customer module active.

---

## Tabs

* All Customers
* Groups
* Deleted

---

## Toolbar

* Search
* Actions
* New Customer

---

# 6. Cards, Panels & Components

Visible UI Components

* Search Box
* Customer Table
* Avatar Chips
* WhatsApp Icons
* Balance Summary Chips
* Import Promotion Banner
* Primary Button
* Dropdown
* Overflow Menu
* Pagination
* Sidebar
* Global Header

---

# 7. Layout Structure

```text
Global Header
──────────────────────────────────────────────

Customers

Tabs

Search Box        Actions      + New Customer

──────────────────────────────────────────────

Customer Table

Name
Contact Info
Closing Balance
Notes
Actions

──────────────────────────────────────────────

Summary Chips

Import Banner

Pagination

Footer
```

---

# 8. Complete Field Inventory

| Section | Row    | Column | Label                                          | Field Type     |
| ------- | ------ | ------ | ---------------------------------------------- | -------------- |
| Tabs    | 1      | 1      | All Customers                                  | Tab            |
| Tabs    | 1      | 2      | Groups                                         | Tab            |
| Tabs    | 1      | 3      | Deleted                                        | Tab            |
| Toolbar | 1      | 1      | Search customers by name, company, phone etc.. | Search Textbox |
| Toolbar | 1      | 2      | Actions                                        | Dropdown       |
| Toolbar | 1      | 3      | + New Customer                                 | Primary Button |
| Table   | Header | 1      | Name                                           | Table Column   |
| Table   | Header | 2      | Contact Info                                   | Table Column   |
| Table   | Header | 3      | Closing Balance                                | Table Column   |
| Table   | Header | 4      | Notes                                          | Table Column   |
| Table   | Header | 5      | Actions                                        | Action Column  |

---

# 9. UI Observations

### Strengths

* Clean master-data layout with a simple search-first workflow.
* Customer names are paired with colored avatar initials for quick identification.
* WhatsApp icons next to phone numbers provide immediate communication cues.
* Outstanding receivables are emphasized in red with the **You Collect** label, making unpaid balances easy to identify.
* Summary chips at the bottom provide an overall payable and receivable snapshot.

### Observations

* Only the first row exposes **Ledger** and **Edit** buttons directly; the remaining rows display only the overflow (**⋯**) menu, indicating row-specific actions or a hover/context-menu pattern.
* The **Contact Info** column is blank for the first customer ("ratan"), suggesting optional contact information.
* No bulk-selection checkboxes or bulk-action toolbar are visible.
* There is no visible filter beyond the search box and the column filter on **Name**.
* The table uses ample whitespace and generous row height, improving readability but reducing information density.

---

# 10. Text Wireframe (ASCII Layout)

```text
────────────────────────────────────────────────────────────────────────────
                             CUSTOMERS
────────────────────────────────────────────────────────────────────────────

[ All Customers (4) ] [ Groups ] [ Deleted ]

┌────────────────────────────────────┬─────────────┬──────────────────────┐
│ Search customers by name...        │ Actions ▼   │ + New Customer       │
└────────────────────────────────────┴─────────────┴──────────────────────┘

────────────────────────────────────────────────────────────────────────────
Name          Contact Info     Closing Balance     Notes            Actions
────────────────────────────────────────────────────────────────────────────
RA  ratan                     ₹180.00
                              You Collect         Created...        Ledger Edit ⋯

SL  SATYAM LIFESTYLE
    9668223676                ₹14,810.00
                              You Collect         Created...        ⋯

CH  chandu
    7809789178                ₹0.00               Created...        ⋯

SW  Swati
    9114949151                ₹0.00               Created...        ⋯

────────────────────────────────────────────────────────────────────────────

[ You Pay ₹0.00 ]   [ You Collect ₹14,990.00 ]

────────────────────────────────────────────────────────────────────────────

Customer/Vendor Import
Upload a list of new customers and vendors or update existing data easily.

                           [Talk to a specialist] [Upgrade 🚀]

────────────────────────────────────────────────────────────────────────────

                                               Page 1/1   ◀   ▶
```

### Distinctive UI Components on This Page

| Component                         | Purpose                                                                                                 |
| --------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Customer Avatar Initials**      | Color-coded circular initials for quick customer identification.                                        |
| **WhatsApp Contact Indicator**    | Indicates customers with available WhatsApp-enabled phone numbers.                                      |
| **Closing Balance Display**       | Highlights receivable amounts with a **You Collect** label and red emphasis.                            |
| **Balance Summary Chips**         | Shows total amounts to pay and collect across all customers.                                            |
| **Customer/Vendor Import Banner** | Promotional section encouraging bulk import and premium upgrade.                                        |
| **Row Action Controls**           | Combination of direct buttons (**Ledger**, **Edit**) and overflow menu (**⋯**) for customer management. |


# UI Layout Analysis – Customer Ledger (Opened after clicking **Ledger**)

---

# 1. Page Overview

### Page Title

**SATYAM LIFESTYLE – Ledger**

(Displayed as a customer ledger modal with the active **Ledger** tab.)

### Purpose

The **Customer Ledger** provides a chronological financial statement for an individual customer. It combines invoices, payments, journal entries, and balance history into a running ledger, allowing users to:

* View complete transaction history
* Track outstanding receivables
* Monitor running closing balance
* Filter ledger records
* Share ledger
* View invoices/payments
* Record incoming/outgoing payments
* Review bill-wise transactions

### Page Type

* Modal / Overlay
* Customer Ledger
* Financial Statement
* Transaction Timeline

### Total Major Sections

1. Modal Header
2. Customer Summary
3. Navigation Tabs
4. Filter Toolbar
5. Ledger Table
6. Pagination

**Total Sections:** **6**

---

# 2. Section-wise Analysis

---

# Section 1 – Modal Header

Located at the top of the modal.

### Row 1 (4 Columns)

| Column | Component            | Type           |
| ------ | -------------------- | -------------- |
| 1      | Close (✕)            | Icon Button    |
| 2      | Customer Information | Display Card   |
| 3      | You Got              | Success Button |
| 4      | You Gave             | Danger Button  |

### Customer Information

Displays

* Customer Avatar
* Customer Name
* Phone Number
* Edit Icon

Below customer information

Label

**You Collect**

Value

**₹15,190.00**

Refresh icon is visible beside amount.

---

# Section 2 – Ledger Navigation

Three navigation tabs.

## Row 1 (3 Columns)

| Column | Label                  | Type       |
| ------ | ---------------------- | ---------- |
| 1      | Ledger                 | Active Tab |
| 2      | Transactions           | Tab        |
| 3      | Bill wise Transactions | Tab        |

---

# Section 3 – Filter Toolbar

Located directly below tabs.

## Row 1 (6 Columns)

### Column 1

**This Year**

Type

Dropdown

Default Value

This Year

---

### Column 2

**Show Pending Invoices**

Type

Toggle Switch

Default

OFF

---

### Column 3

**Include Journal Transactions**

Type

Toggle Switch

Default

OFF

---

### Column 4

**Share**

Type

Secondary Button

---

### Column 5

**View**

Type

Secondary Button

---

### Column 6

Overflow Menu

Type

Icon Button (⋯)

---

# Section 4 – Ledger Table

## Table Title

Customer Ledger

---

## Column Headers

| Column          |
| --------------- |
| Document #      |
| Date & Time     |
| Status/Mode     |
| Amount          |
| Closing Balance |
| Actions         |

Sorting

* Date & Time

Filter

* Date & Time

---

## Visible Rows

---

### Row 1

Document #

**INV-158**

Subtext

Invoice

Date

22 Jul 26

05:54 PM

Status

partially paid

Notification Bell icon

Amount

− ₹2,300.00

Closing Balance

₹15,190.00

Actions

* View
* More (⋯)

---

### Row 2

Document #

**PAYIN-9**

Subtext

Payment In

Document icon

Date

22 Jul 26

05:54 PM

Mode

UPI

Amount

* ₹2,000.00

Closing Balance

₹12,890.00

Actions

* View
* More (⋯)

---

### Row 3

Document #

**INV-157**

Subtext

Invoice

Date

21 Jul 26

06:02 PM

Status

pending

Subtext

since 1 day

Bell icon

Amount

− ₹180.00

Closing Balance

₹14,890.00

Actions

* View
* More (⋯)

---

### Row 4

Document #

**Balance as of 01 Apr 2026**

Type

Balance

Amount

− ₹14,710.00

Closing Balance

₹14,710.00

Actions

None

---

# Section 5 – Pagination

## Row 1 (3 Columns)

| Column | Component |
| ------ | --------- |
| 1      | 1/1       |
| 2      | Previous  |
| 3      | Next      |

---

# 3. Buttons & Actions

| Button    | Type            | Position        | Alignment |
| --------- | --------------- | --------------- | --------- |
| Close (✕) | Icon            | Header          | Left      |
| Edit      | Icon            | Customer Header | Left      |
| You Got   | Primary Success | Header          | Right     |
| You Gave  | Primary Danger  | Header          | Right     |
| Share     | Secondary       | Toolbar         | Right     |
| View      | Secondary       | Toolbar         | Right     |
| More (⋯)  | Icon            | Toolbar         | Right     |
| View      | Secondary       | Each Ledger Row | Right     |
| More (⋯)  | Icon            | Each Ledger Row | Right     |
| Previous  | Pagination      | Bottom Right    | Right     |
| Next      | Pagination      | Bottom Right    | Right     |

---

# 4. Tables

## Ledger Table

### Column Headers

1. Document #
2. Date & Time
3. Status/Mode
4. Amount
5. Closing Balance
6. Actions

---

### Search Box

Not visible

---

### Filters

Visible

* Date & Time filter

---

### Sorting

Visible

* Date & Time

---

### Pagination

Present

---

### Bulk Actions

Not visible

---

### Row Selection

Not visible

---

### Status Badges

Visible

* partially paid
* pending
* UPI

---

# 5. Navigation Elements

## Tabs

* Ledger (Active)
* Transactions
* Bill wise Transactions

---

## Toolbar

* This Year
* Show Pending Invoices
* Include Journal Transactions
* Share
* View
* More Menu

---

# 6. Cards, Panels & Components

Visible Components

* Modal Window
* Customer Summary Card
* Avatar Badge
* Amount Summary
* Tabs
* Toggle Switches
* Dropdown
* Ledger Table
* Status Badges
* Bell Notification Icons
* Action Buttons
* Overflow Menu
* Pagination

---

# 7. Layout Structure

```text
Background Page (Dimmed)
┌────────────────────────────────────────────────────────────────────┐
│                      CUSTOMER LEDGER MODAL                         │
├────────────────────────────────────────────────────────────────────┤
│ Customer Info                        You Got   You Gave   Close    │
├────────────────────────────────────────────────────────────────────┤
│ Ledger | Transactions | Bill wise Transactions                    │
├────────────────────────────────────────────────────────────────────┤
│ This Year │ Pending Toggle │ Journal Toggle │ Share │ View │ ⋯     │
├────────────────────────────────────────────────────────────────────┤
│ Ledger Table                                                  │
│ Document │ Date │ Status │ Amount │ Closing │ Actions         │
├────────────────────────────────────────────────────────────────────┤
│ Pagination                                               1/1 ◀ ▶    │
└────────────────────────────────────────────────────────────────────┘
```

---

# 8. Complete Field Inventory

| Section | Row    | Column | Label                        | Field Type     |
| ------- | ------ | ------ | ---------------------------- | -------------- |
| Header  | 1      | 1      | Close                        | Icon Button    |
| Header  | 1      | 2      | Customer Name                | Display        |
| Header  | 1      | 2      | Phone Number                 | Display        |
| Header  | 1      | 2      | You Collect                  | Amount Display |
| Header  | 1      | 3      | You Got                      | Button         |
| Header  | 1      | 4      | You Gave                     | Button         |
| Tabs    | 1      | 1      | Ledger                       | Tab            |
| Tabs    | 1      | 2      | Transactions                 | Tab            |
| Tabs    | 1      | 3      | Bill wise Transactions       | Tab            |
| Toolbar | 1      | 1      | This Year                    | Dropdown       |
| Toolbar | 1      | 2      | Show Pending Invoices        | Toggle         |
| Toolbar | 1      | 3      | Include Journal Transactions | Toggle         |
| Toolbar | 1      | 4      | Share                        | Button         |
| Toolbar | 1      | 5      | View                         | Button         |
| Toolbar | 1      | 6      | More                         | Icon Button    |
| Table   | Header | 1      | Document #                   | Table Column   |
| Table   | Header | 2      | Date & Time                  | Table Column   |
| Table   | Header | 3      | Status/Mode                  | Table Column   |
| Table   | Header | 4      | Amount                       | Table Column   |
| Table   | Header | 5      | Closing Balance              | Table Column   |
| Table   | Header | 6      | Actions                      | Table Column   |

---

# 9. UI Observations

### Strengths

* The ledger opens as a modal overlay, allowing users to review account history without leaving the customer list.
* Customer identity, contact number, and outstanding balance are prominently displayed at the top.
* Running **Closing Balance** after every transaction provides a clear financial timeline.
* Positive and negative amounts are differentiated with **+** and **−** prefixes, improving readability.
* Separate tabs (**Ledger**, **Transactions**, **Bill wise Transactions**) suggest multiple financial views for the same customer.

### Observations

* No search box is available within the ledger; filtering is limited to **This Year** and two toggle options.
* The **Share**, **View**, and overflow (**⋯**) actions are grouped on the toolbar rather than being embedded into the header.
* Status badges such as **partially paid** and **pending** use distinct colors and include notification bell icons, drawing attention to unpaid invoices.
* The opening balance row (**Balance as of 01 Apr 2026**) is displayed as a ledger entry, which provides context for subsequent transactions.
* No export, print, or download actions are visible in this modal.

---

# 10. Text Wireframe (ASCII Layout)

```text
────────────────────────────────────────────────────────────────────────────────────────────
✕  SATYAM LIFESTYLE
   9668223676

You Collect
₹15,190.00

                                      [You Got] [You Gave]

────────────────────────────────────────────────────────────────────────────────────────────

[ Ledger ] [ Transactions ] [ Bill wise Transactions ]

────────────────────────────────────────────────────────────────────────────────────────────

[ This Year ▼ ]
[ Show Pending Invoices ○ ]
[ Include Journal Transactions ○ ]

                                     [ Share ] [ View ] [ ⋯ ]

────────────────────────────────────────────────────────────────────────────────────────────

Document #      Date & Time      Status/Mode        Amount      Closing Balance    Actions
────────────────────────────────────────────────────────────────────────────────────────────
INV-158         22 Jul 26        partially paid     -₹2,300.00  ₹15,190.00        [View][⋯]
Invoice         05:54 PM

PAYIN-9         22 Jul 26        UPI                +₹2,000.00  ₹12,890.00        [View][⋯]
Payment In      05:54 PM

INV-157         21 Jul 26        pending            -₹180.00    ₹14,890.00        [View][⋯]
Invoice         06:02 PM

Balance as of 01 Apr 2026                          -₹14,710.00  ₹14,710.00

────────────────────────────────────────────────────────────────────────────────────────────

                                                            Page 1/1   ◀   ▶
```

### Distinctive UI Components on This Page

| Component                                               | Purpose                                                                                                       |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Customer Ledger Modal**                               | Displays the complete financial history for a single customer without navigating away from the customer list. |
| **Customer Summary Header**                             | Shows avatar, customer name, phone number, outstanding balance, and quick actions.                            |
| **Ledger / Transactions / Bill wise Transactions Tabs** | Provides multiple views of the customer's financial records.                                                  |
| **Running Closing Balance**                             | Displays the updated outstanding balance after each ledger entry.                                             |
| **Status Badges**                                       | Indicates invoice states such as **partially paid**, **pending**, and payment modes like **UPI**.             |
| **Ledger Filters**                                      | Includes period selection and toggles for pending invoices and journal transactions.                          |
| **Quick Collection Buttons**                            | **You Got** and **You Gave** buttons allow rapid recording of incoming or outgoing customer payments.         |



# UI Layout Analysis – **Add Customer** (Customer Creation Side Panel)

---

# 1. Page Overview

### Page Title

**Add Customer**

### Purpose

This page is a **slide-over (right-side drawer)** used to create a new customer. It collects personal details, company information, addresses, opening balance, and tax-related settings.

### Page Type

* Right-side Drawer / Side Panel
* Customer Creation Form
* Multi-section Form

### Total Sections / Cards / Forms

| Section                    | Count |
| -------------------------- | ----: |
| Header                     |     1 |
| Tab Navigation             |     1 |
| Basic Details              |     1 |
| Company Details (Optional) |     1 |
| Add Custom Fields Banner   |     1 |
| Billing Address            |     1 |
| Shipping Address           |     1 |
| Optional Details           |     1 |
| Footer Action Bar          |     1 |

**Total Major Sections:** **9**

---

# 2. Section-wise Analysis

---

# Section 1 – Header

Located at top.

## Row 1 (3 Columns)

| Column | Component    | Type           |
| ------ | ------------ | -------------- |
| 1      | Close (✕)    | Icon Button    |
| 2      | Add Customer | Page Title     |
| 3      | Save         | Primary Button |

---

# Section 2 – Navigation

## Row 1

Active Tab

* **Basic Details**

---

# Section 3 – Basic Details

Heading

**Basic Details**

Top-right

**Add Custom fields**

(Button)

---

## Row 1 (1 Column)

### Column 1

Label

***Name**

Field Type

Text Input

Placeholder

**Ratan TATA**

Required

Yes (Red *)

Default Value

None

---

## Row 2 (2 Columns)

### Column 1

Label

Phone

Contains

Country Code Dropdown

Default

+91

Phone Number Textbox

Placeholder

Phone number

---

### Column 2

Label

Email

Field Type

Text Input

Placeholder

[name@example.com](mailto:name@example.com)

Required

Optional

---

# Section 4 – Company Details (Optional)

Heading

**Company Details (Optional)**

---

## Row 1 (2 Columns)

### Column 1

GSTIN

Text Input

Placeholder

29AABCT1332L000

---

### Column 2

Button

Fetch Details

Secondary Button

---

## Row 2 (1 Column)

Company Name

Text Input

Placeholder

NEXTSPEED TECHNOLOGIES PRIVATE LIMITED

---

# Section 5 – Add Custom Fields Banner

Blue Promotional Card

Heading

**Add custom fields**

Description

Personalize it to perfectly suit your style.

Contains

* User avatars
* Premium notice
* Talk to a specialist
* Upgrade button

---

# Section 6 – Billing Address

Heading

Billing Address

---

## Row 1

Button

**+ Billing Address**

Type

Outline Button

---

# Section 7 – Shipping Address

Heading

Shipping Address

---

## Row 1

Button

**+ Shipping Address**

Type

Outline Button

---

# Section 8 – Optional Details

Heading

Optional Details

---

## Subsection

Opening Balance

---

### Row 1 (2 Columns)

Radio Buttons

* Debit (Selected)
* Credit

---

### Row 2 (1 Column)

Opening Balance

Text Input

Placeholder

₹ Enter Debit Amount

Right-side Static Text

Customer pays you ₹

---

### Row 3

Label

TDS

Toggle

Default

OFF

Badge

No

---

### Row 4

Label

TCS

Toggle

Default

OFF

Badge

No

---

### Row 5

Label

RCM Applicable

Toggle

Default

OFF

Badge

No

Description

If enabled, RCM will be turned on automatically when creating document

---

# Section 9 – Footer Actions

Bottom Sticky Bar

---

## Row 1 (2 Columns)

### Column 1

Save

Primary Button

---

### Column 2

Cancel

Secondary Button

---

# 3. Buttons & Actions

| Button               | Type      | Position         | Alignment |
| -------------------- | --------- | ---------------- | --------- |
| Close (✕)            | Icon      | Header           | Left      |
| Save                 | Primary   | Header           | Right     |
| Add Custom fields    | Secondary | Basic Details    | Right     |
| Fetch Details        | Secondary | GSTIN Row        | Right     |
| Upgrade              | Warning   | Banner           | Right     |
| Talk to a specialist | Secondary | Banner           | Right     |
| + Billing Address    | Outline   | Billing Section  | Left      |
| + Shipping Address   | Outline   | Shipping Section | Left      |
| Save                 | Primary   | Footer           | Left      |
| Cancel               | Secondary | Footer           | Left      |

---

# 4. Tables (if present)

No tables are present.

---

# 5. Navigation Elements

## Page Navigation

* Basic Details (Active)

---

## Drawer Controls

* Close
* Save

---

## Sidebar (Background)

Visible but disabled behind overlay

---

# 6. Cards, Panels & Components

Visible Components

* Slide-over Drawer
* Form Cards
* Text Inputs
* Dropdown
* Radio Buttons
* Toggle Switches
* Promotional Banner
* Buttons
* Footer Action Bar
* Section Headers

---

# 7. Layout Structure

```text
Background Page (Dimmed)
┌──────────────────────────────────────────────────────────────┐
│                     ADD CUSTOMER DRAWER                      │
├──────────────────────────────────────────────────────────────┤
│ ✕ Add Customer                                   Save        │
├──────────────────────────────────────────────────────────────┤
│ Basic Details                                             │
├──────────────────────────────────────────────────────────────┤
│ Name                                                      │
│ Phone              Email                                  │
├──────────────────────────────────────────────────────────────┤
│ Company Details (Optional)                                │
│ GSTIN                  Fetch Details                       │
│ Company Name                                            │
├──────────────────────────────────────────────────────────────┤
│ Add Custom Fields Banner                                 │
├──────────────────────────────────────────────────────────────┤
│ Billing Address                                          │
│ + Billing Address                                        │
├──────────────────────────────────────────────────────────────┤
│ Shipping Address                                         │
│ + Shipping Address                                       │
├──────────────────────────────────────────────────────────────┤
│ Optional Details                                         │
│ Debit ○  Credit ○                                        │
│ Opening Balance                                          │
│ TDS Toggle                                               │
│ TCS Toggle                                               │
│ RCM Applicable Toggle                                    │
├──────────────────────────────────────────────────────────────┤
│ Save                 Cancel                              │
└──────────────────────────────────────────────────────────────┘
```

---

# 8. Complete Field Inventory

| Section          | Row | Column | Label           | Field Type     |
| ---------------- | --- | ------ | --------------- | -------------- |
| Basic Details    | 1   | 1      | *Name           | Text Input     |
| Basic Details    | 2   | 1      | Country Code    | Dropdown       |
| Basic Details    | 2   | 1      | Phone           | Text Input     |
| Basic Details    | 2   | 2      | Email           | Text Input     |
| Company Details  | 1   | 1      | GSTIN           | Text Input     |
| Company Details  | 2   | 1      | Company Name    | Text Input     |
| Optional Details | 1   | 1      | Debit           | Radio Button   |
| Optional Details | 1   | 2      | Credit          | Radio Button   |
| Optional Details | 2   | 1      | Opening Balance | Currency Input |
| Optional Details | 3   | 1      | TDS             | Toggle         |
| Optional Details | 4   | 1      | TCS             | Toggle         |
| Optional Details | 5   | 1      | RCM Applicable  | Toggle         |

---

# 9. UI Observations

### Strengths

* The customer creation workflow is organized into logical sections: personal details, company information, addresses, and financial settings.
* Required fields are clearly marked with a red asterisk (e.g., **Name**).
* GSTIN includes a dedicated **Fetch Details** action for automatic company lookup.
* Billing and shipping addresses are added on demand, reducing initial form complexity.
* Optional financial settings (TDS, TCS, RCM Applicable) are grouped together, keeping advanced options separate from basic customer information.
* The **Save** action is available both in the header and the sticky footer for convenience during long forms.

### Observations

* Only the **Basic Details** tab is visible; no additional tabs appear in this drawer.
* Placeholder text is used extensively to guide data entry.
* The promotional **Add custom fields** banner interrupts the form flow visually and may distract users completing the form.
* Address sections remain collapsed until the corresponding **+ Billing Address** or **+ Shipping Address** button is clicked.
* No inline validation messages or helper text are visible for required fields other than the asterisk indicator.
* Toggle switches default to **OFF**, with a visible **No** state badge.
* No file upload, notes, or profile image fields are present in the visible portion of the form.



# UI Layout Analysis – **Vendors**

---

# 1. Page Overview

### Page Title

**Vendors**

### Purpose

This page is used to **manage vendors/suppliers**. It allows users to:

* View all vendors
* Create a new vendor
* Import vendors in bulk
* Manage vendor custom fields
* View outstanding balances
* Open vendor ledger
* Edit vendor details

### Page Type

Master List / Data Management Page

### Total Major Sections / Cards / Forms

| Section            | Count |
| ------------------ | ----: |
| Header             |     1 |
| Quick Action Cards |     3 |
| Vendor Tabs        |     1 |
| Search & Toolbar   |     1 |
| Vendor Table       |     1 |
| Summary Footer     |     1 |
| Promotional Banner |     1 |
| Page Footer        |     1 |

**Total Major Sections:** **8**

---

# 2. Section-wise Analysis

---

# Section 1 – Page Header

## Row 1 (2 Columns)

| Column | Component           | Type         |
| ------ | ------------------- | ------------ |
| Left   | Vendors             | Page Heading |
| Right  | Pink play/help icon | Icon Button  |

---

# Section 2 – Quick Action Cards

Three informational/action cards.

## Row 1 (3 Columns)

### Column 1

**Add New Vendor**

Description

> Create a new vendor manually.

Type

Navigation Card

---

### Column 2

**Bulk Import Vendors**

Description

> Import multiple vendors using an Excel file.

Type

Navigation Card

---

### Column 3

**Custom Fields**

Description

> Add custom fields required for your business needs.

Type

Navigation Card

---

# Section 3 – Vendor Navigation Tabs

## Row 1 (3 Columns)

| Column | Tab             | Status   |
| ------ | --------------- | -------- |
| 1      | All Vendors (1) | Active   |
| 2      | Groups          | Inactive |
| 3      | Deleted         | Inactive |

---

# Section 4 – Search & Toolbar

## Row 1 (4 Columns)

### Column 1

Search Vendors

Type

Search Textbox

Placeholder

> Search Vendors by company, name, phone etc..

---

### Column 2

Actions

Dropdown Button

---

### Column 3

New Vendor

Primary Button

---

### Column 4

None

---

# Section 5 – Vendor Table

## Table Title

Vendor Listing

### Table Columns

| # | Header          |
| - | --------------- |
| 1 | Name            |
| 2 | Contact Info    |
| 3 | Closing Balance |
| 4 | Notes           |
| 5 | Actions         |

Sorting icon visible

* Name
* Closing Balance

Filter icon visible

* Name column

---

## Data Row (Visible)

### Column 1

Vendor Avatar

MA

Vendor Name

maruf

---

### Column 2

Contact Info

Empty

---

### Column 3

Closing Balance

₹15,840.00

Status

You Pay ↑

Displayed in Red

---

### Column 4

Notes

Created 06 Jun 26,

11:09 AM

by Chandan

---

### Column 5

Actions

* Ledger
* Edit
* More (...)

---

# Section 6 – Summary Footer

## Row 1 (2 Columns)

### Column 1

You Pay

₹15,840.00

Summary Chip

---

### Column 2

You Collect

₹0.00

Summary Chip

---

# Section 7 – Promotional Banner

Heading

Customer/ Vendor Import

Description

Upload a list of new customers and vendors or update existing data easily.

Contains

* User avatars
* Premium text
* Talk to a specialist
* Upgrade button

---

# Section 8 – Footer

Contains

* Swipe Logo
* Copyright
* Security notice

---

# 3. Buttons & Actions

| Button               | Type            | Position      | Alignment |
| -------------------- | --------------- | ------------- | --------- |
| Add New Vendor       | Navigation Card | Top           | Left      |
| Bulk Import Vendors  | Navigation Card | Top           | Center    |
| Custom Fields        | Navigation Card | Top           | Right     |
| Actions              | Dropdown        | Toolbar       | Right     |
| + New Vendor         | Primary         | Toolbar       | Right     |
| Ledger               | Secondary       | Table Row     | Right     |
| Edit                 | Secondary       | Table Row     | Right     |
| More (...)           | Icon Button     | Table Row     | Right     |
| Upgrade              | Warning         | Bottom Banner | Right     |
| Talk to a specialist | Secondary       | Bottom Banner | Right     |

---

# 4. Tables

## Table Title

Vendor List

### Column Headers

1. Name
2. Contact Info
3. Closing Balance
4. Notes
5. Actions

---

### Search Box

Yes

Placeholder

Search Vendors by company, name, phone etc..

---

### Filters

* Name filter icon

---

### Sorting

Available

* Name
* Closing Balance

---

### Pagination

Bottom-right

* 1/1
* Previous
* Next

---

### Bulk Actions

Available

Actions dropdown

---

### Row Selection

Not visible

---

### Status Indicators

* You Pay
* You Collect

Displayed using color-coded values

---

# 5. Navigation Elements

## Sidebar

* Sales
* Purchases
* Quotations+
* Expenses+
* SwipeAI
* Products & Services
* Inventory
* Payments
* Customers
* **Vendors (Active)**
* Projects
* Insights
* Reports
* OnlineStore
* E-way Bills
* Invite Users
* Settings

---

## Page Tabs

* All Vendors
* Groups
* Deleted

---

## Toolbar

* Search
* Actions
* New Vendor

---

# 6. Cards, Panels & Components

Visible Components

* Page Header
* Three Quick Action Cards
* Search Box
* Dropdown
* Data Table
* Summary Chips
* Promotional Banner
* Avatar Badges
* Action Buttons
* Pagination
* Floating WhatsApp Button

No visible:

* Modal
* Accordion
* Upload Area
* Rich Text Editor
* Progress Bar

---

# 7. Layout Structure

```
Page
│
├── Header
│
├── Quick Action Cards (3-column grid)
│
├── Tabs
│
├── Search & Toolbar
│
├── Vendor Table
│      ├── Header
│      ├── Data Row(s)
│      └── Pagination
│
├── Summary Chips
│
├── Promotional Banner
│
└── Footer
```

### Grid Layout

* Main content: Single-column container
* Quick actions: 3-column grid
* Toolbar: Horizontal layout
* Table: Full-width
* Summary chips: Horizontal row

---

# 8. Complete Field Inventory

| Section        | Row | Column | Label                                        | Field Type       |
| -------------- | --- | ------ | -------------------------------------------- | ---------------- |
| Search Toolbar | 1   | 1      | Search Vendors by company, name, phone etc.. | Search Textbox   |
| Toolbar        | 1   | 2      | Actions                                      | Dropdown         |
| Toolbar        | 1   | 3      | New Vendor                                   | Primary Button   |
| Table          | 1   | 1      | Name                                         | Sortable Header  |
| Table          | 1   | 2      | Contact Info                                 | Text Column      |
| Table          | 1   | 3      | Closing Balance                              | Sortable Header  |
| Table          | 1   | 4      | Notes                                        | Text Column      |
| Table          | 1   | 5      | Ledger                                       | Secondary Button |
| Table          | 1   | 5      | Edit                                         | Secondary Button |
| Table          | 1   | 5      | More                                         | Icon Button      |

---

# 9. UI Observations

### Strengths

* Quick action cards provide clear entry points for common vendor management tasks.
* Search and action controls are positioned consistently above the data table.
* Financial balances use color coding (red for **You Pay**) to emphasize outstanding liabilities.
* Summary chips at the bottom provide an immediate financial overview.
* Table actions (**Ledger**, **Edit**, **More**) are compact and easy to locate.

### Observations

* The **Contact Info** column is empty for the visible vendor, leaving unused whitespace.
* Quick action cards have similar visual weight and could benefit from stronger differentiation between primary and secondary actions.
* The **Actions** dropdown does not indicate its available bulk operations from the list view.
* Only one vendor is visible, resulting in a table with significant unused vertical space.
* No row selection checkboxes are available, suggesting bulk operations are accessed differently.
* No status badges (such as Active/Inactive) are shown for vendors.
* The promotional banner occupies a noticeable portion of the lower page and competes visually with the primary content.

---

# 10. Text Wireframe (ASCII Layout)

```text
────────────────────────────────────────────────────────────────────────────────────────────────────
                                    VENDORS
────────────────────────────────────────────────────────────────────────────────────────────────────

┌─────────────────────────┬─────────────────────────┬─────────────────────────┐
│ Add New Vendor          │ Bulk Import Vendors    │ Custom Fields           │
│ Create manually         │ Import Excel file      │ Add business fields     │
└─────────────────────────┴─────────────────────────┴─────────────────────────┘

Tabs:
[ All Vendors (1) ]   Groups   Deleted

┌──────────────────────────────────────────────┐   [Actions ▼] [ + New Vendor ]
│ 🔍 Search Vendors by company, name...        │
└──────────────────────────────────────────────┘

┌──────────────┬───────────────┬────────────────┬──────────────────────────┬────────────────────┐
│ Name         │ Contact Info  │ Closing Balance│ Notes                    │ Actions            │
├──────────────┼───────────────┼────────────────┼──────────────────────────┼────────────────────┤
│ MA maruf     │               │ ₹15,840.00     │ Created 06 Jun 26        │ Ledger Edit ⋯      │
│              │               │ You Pay ↑      │ by Chandan               │                    │
└──────────────┴───────────────┴────────────────┴──────────────────────────┴────────────────────┘

[ You Pay ₹15,840.00 ]   [ You Collect ₹0.00 ]

────────────────────────────────────────────────────────────────────────────────────────────────────

Customer/Vendor Import
Upload a list of new customers and vendors...

                                   [Talk to a specialist]   [Upgrade]

────────────────────────────────────────────────────────────────────────────────────────────────────
```



# UI Layout Analysis – **Insights**

---

# 1. Page Overview

### Page Title

**Insights**

### Purpose

The **Insights** page acts as a business analytics dashboard, providing an overview of financial performance, customer behavior, product movement, invoices, payments, and overall business health. It consolidates KPIs, charts, summaries, and analytical widgets into a single reporting interface.

### Page Type

* Analytics Dashboard
* Reporting Dashboard
* KPI Overview Page

### Total Sections / Cards / Forms

| Component                 | Count |
| ------------------------- | ----: |
| Header                    |     1 |
| KPI Summary Cards         |     6 |
| Reports Overview Panel    |     1 |
| Summary Statistics Cards  |     4 |
| Customer Analysis Section |     1 |
| Payment Analysis Cards    |     4 |
| Customer Analysis Cards   |     4 |
| Product Analysis Cards    |     6 |
| Swipe Usage Heatmap       |     1 |
| Footer                    |     1 |

**Approximate Total Major Components:** **25+**

---

# 2. Section-wise Analysis

---

# Section 1 – Dashboard Header

## Row 1 (1 Column)

| Column | Component | Type       |
| ------ | --------- | ---------- |
| 1      | Insights  | Page Title |

No editable fields.

---

# Section 2 – KPI Summary Cards

Located below page title.

## Row 1 (6 Columns)

### Column 1

Label

Cash In

Display

₹0

Component

KPI Card

---

### Column 2

Label

Cash Out

Display

₹0

Component

KPI Card

---

### Column 3

Label

Products Sold

Display

0

Component

KPI Card

---

### Column 4

Label

Customers

Display

0

Component

KPI Card

---

### Column 5

Label

Pending Invoices

Display

₹0

Component

KPI Card

---

### Column 6

Label

Invoices

Display

0

Component

KPI Card

---

# Section 3 – Reports Overview

Heading

Reports Overview

---

## Row 1 (2 Columns)

### Column 1

Date Range

Field Type

Date Range Picker

Default Value

01-06-2026 – 30-06-2026

---

### Column 2

None

---

## Row 2

Large Report Canvas

Displays

No data

---

## Right Sidebar Summary Cards

Four stacked KPI cards.

### Card 1

Total Sales

₹0

---

### Card 2

Total Purchases

₹15.84K

---

### Card 3

Total Expenses

₹0

---

### Card 4

Total Indirect Income

₹0

---

# Section 4 – Payment Analysis

Heading

Payment Analysis

---

## Row 1

Date Range Picker

Default

01-06-2026 – 30-06-2026

---

## Row 2 (2 Columns)

### Left Card

Payment Methods

Empty State

No Payment Methods

---

### Right Card

Peak Performing Days

Empty State

No Customers

---

## Row 3 (2 Columns)

### Left Card

Recurring Customers

Empty

---

### Right Card

Top Customers by Sales

Empty

---

# Section 5 – Customer Analysis

Heading

Customer Analysis

---

## Row 1

Date Range Picker

Default

01-06-2026 – 30-06-2026

---

## Row 2 (2 Columns)

### Card 1

Payment Methods

No Payment Methods

---

### Card 2

Peak Performing Days

No Customers

---

## Row 3 (2 Columns)

### Card 1

Recurring Customers

No Products

---

### Card 2

Top Customers by Sales

No Expense recorded in the date range selected

---

# Section 6 – Product Analysis

Several analytical cards.

Visible cards include

---

## Card

Slow-moving Products

Empty

No Products

---

## Card

Products

Empty

No Products

---

## Card

Customers

Empty

No Regular Customers

---

## Card

Expense Summary

No Expense recorded in the date range selected

---

Several cards include

More menu (...)

---

# Section 7 – Swipe Usage

Heading

Swipe Usage

---

Contains

Swipe Invoices Graph

Heatmap Calendar

Months displayed

Jul → Jul

Days

Monday

Wednesday

Friday

Heatmap squares

---

# 3. Buttons & Actions

| Button            | Type      | Position          | Alignment |
| ----------------- | --------- | ----------------- | --------- |
| Upgrade Now       | CTA       | Top Banner        | Center    |
| Date Range Picker | Dropdown  | Reports           | Left      |
| Date Range Picker | Dropdown  | Payment Analysis  | Left      |
| Date Range Picker | Dropdown  | Customer Analysis | Left      |
| More (...)        | Icon Menu | Multiple Cards    | Right     |

No create/edit/delete buttons visible.

---

# 4. Tables

No traditional tables are present.

Instead the page contains

* Dashboard Cards
* KPI Tiles
* Analytical Widgets
* Charts
* Empty-state panels

No

* Pagination
* Row selection
* Bulk actions

---

# 5. Navigation Elements

## Sidebar

* Sales
* Purchases
* Quotations+
* Expenses+
* SwipeAI
* Products & Services
* Inventory
* Payments
* Customers
* Vendors
* Projects
* **Insights (Active)**
* Reports
* OnlineStore
* E-way Bills
* Invite Users
* Settings

---

## Header Banner

Bulk Edit, Download, Merge & Convert Your Docs

Upgrade Now

---

## Date Navigation

Three visible date range selectors.

---

# 6. Cards, Panels & Components

Visible UI Components

* KPI Cards
* Dashboard Cards
* Date Pickers
* Empty State Cards
* Statistic Cards
* Heatmap
* Summary Sidebar Cards
* Card Headers
* More Menu (...)
* Banner
* Footer

No

* Modal
* Accordion
* Upload
* Rich Text Editor
* Form Inputs

---

# 7. Layout Structure

```
Top Banner
│
├── Dashboard Title
│
├── KPI Cards (6-column row)
│
├── Reports Overview
│      ├── Date Range
│      ├── Report Canvas
│      └── Right Summary Cards
│
├── Payment Analysis
│      ├── Date Filter
│      ├── 2-column Cards
│      └── 2-column Cards
│
├── Customer Analysis
│      ├── Date Filter
│      ├── 2-column Cards
│      └── 2-column Cards
│
├── Product Analytics
│      ├── 2-column Grid
│      ├── 2-column Grid
│      └── Multiple Cards
│
├── Swipe Usage Heatmap
│
└── Footer
```

### Grid Layout

* Overall: Single-column dashboard
* KPI row: 6-column grid
* Analytics widgets: Mostly 2-column grid
* Summary metrics: Right-side stacked cards
* Heatmap: Full-width

---

# 8. Complete Field Inventory

| Section           | Row | Column | Label      | Field Type        |
| ----------------- | --- | ------ | ---------- | ----------------- |
| Reports Overview  | 1   | 1      | Date Range | Date Range Picker |
| Payment Analysis  | 1   | 1      | Date Range | Date Range Picker |
| Customer Analysis | 1   | 1      | Date Range | Date Range Picker |

No other user-editable fields are visible.

---

# 9. UI Observations

### Strengths

* The dashboard follows a clear hierarchy: KPI summary → reports → detailed analytics → usage visualization.
* KPI cards provide an immediate snapshot of key business metrics.
* Related analytics are grouped into dedicated sections (Reports Overview, Payment Analysis, Customer Analysis, Product Analysis).
* Consistent use of cards, spacing, and typography creates a uniform dashboard experience.
* The **Swipe Usage** heatmap offers a compact visualization of activity over time.

### Observations

* Most analytics widgets display **empty states** ("No data", "No Customers", "No Products", etc.), resulting in large unused areas.
* Several cards repeat similar empty-state illustrations, reducing visual variety.
* Some section headings (e.g., Product-related analytics) are not clearly distinguished, making it harder to identify grouping at a glance.
* The right-side summary cards in the **Reports Overview** section are visually separated but not labeled as a distinct summary area.
* Card menus (`...`) are present but their available actions are not visible.
* No charts, graphs, or trend lines are displayed because there is insufficient data.

---

# 10. Text Wireframe (ASCII Layout)

```text
──────────────────────────────────────────────────────────────────────────────────────────────────────────────
                                            INSIGHTS
──────────────────────────────────────────────────────────────────────────────────────────────────────────────

┌────────────┬────────────┬────────────┬────────────┬────────────┬────────────┐
│ Cash In    │ Cash Out   │ Products   │ Customers  │ Pending    │ Invoices   │
│ ₹0         │ ₹0         │ 0          │ 0          │ ₹0         │ 0          │
└────────────┴────────────┴────────────┴────────────┴────────────┴────────────┘

REPORTS OVERVIEW

[ 01-06-2026 ─────── 30-06-2026 ]

┌───────────────────────────────────────────────┬────────────────────────────┐
│                                               │ Total Sales                │
│                 No Data                       │ ₹0                         │
│                                               ├────────────────────────────┤
│                                               │ Total Purchases            │
│                                               │ ₹15.84K                    │
│                                               ├────────────────────────────┤
│                                               │ Total Expenses             │
│                                               │ ₹0                         │
│                                               ├────────────────────────────┤
│                                               │ Total Indirect Income      │
│                                               │ ₹0                         │
└───────────────────────────────────────────────┴────────────────────────────┘

PAYMENT ANALYSIS

[ Date Range ]

┌──────────────────────────────┬──────────────────────────────┐
│ Payment Methods              │ Peak Performing Days         │
│ No Payment Methods           │ No Customers                 │
├──────────────────────────────┼──────────────────────────────┤
│ Recurring Customers          │ Top Customers by Sales       │
│ Empty                        │ Empty                        │
└──────────────────────────────┴──────────────────────────────┘

CUSTOMER ANALYSIS

[ Date Range ]

┌──────────────────────────────┬──────────────────────────────┐
│ Payment Methods              │ Peak Performing Days         │
│ No Payment Methods           │ No Customers                 │
├──────────────────────────────┼──────────────────────────────┤
│ Recurring Customers          │ Top Customers by Sales       │
│ No Products                  │ No Expense Data              │
└──────────────────────────────┴──────────────────────────────┘

PRODUCT ANALYSIS

┌──────────────────────────────┬──────────────────────────────┐
│ Slow-moving Products         │ Products                     │
│ No Products                  │ No Products                  │
├──────────────────────────────┼──────────────────────────────┤
│ Customers                    │ Expense Summary             │
│ No Regular Customers         │ No Expense Recorded         │
└──────────────────────────────┴──────────────────────────────┘

SWIPE USAGE

┌────────────────────────────────────────────────────────────────────────────┐
│ Swipe Invoices Graph (Calendar Heatmap)                                   │
└────────────────────────────────────────────────────────────────────────────┘
```



You're right. I missed several analytics widgets because the page is very long and many cards have empty-state placeholders. Below is the **complete inventory of the analytics cards** visible on the Insights page.

# Missing Analytics Widgets

## Reports Overview

### Main Report Canvas

* Reports Overview
* Date Range Picker
* Main Analytics Graph (Empty State)

### Summary KPI Cards

* Total Sales
* Total Purchases
* Total Expenses
* Total Indirect Income

---

# Customer Analysis

## Card 1

### Payment Methods

Purpose

* Payment distribution by payment mode

Visualization

* Pie / Bar Chart (currently empty)

Empty State

* No Payment Methods

---

## Card 2

### Peak Performing Days

Purpose

* Highest sales days

Visualization

* Line / Bar Chart

Empty State

* No Customers

---

## Card 3

### Recurring Customers

Purpose

* Repeat customer analysis

Visualization

* Customer frequency chart

Empty State

* No Regular Customers

---

## Card 4

### Top Customers by Sales

Purpose

* Highest purchasing customers

Visualization

* Ranked List / Bar Chart

Empty State

* No Customers

---

# Product Analysis

## Card

### Top Categories by Sales

Purpose

* Highest selling product categories

Visualization

* Bar / Donut Chart

Empty State

* No Categories

---

## Card

### Top Products by Sales

Purpose

* Products sold in highest quantity

Visualization

* Ranked List

Empty State

* No Products

---

## Card

### Products Expiring Soon

Purpose

* Inventory nearing expiry

Visualization

* Table/List

Empty State

* No Products

---

## Card

### Low Inventory

Purpose

* Products below reorder level

Visualization

* Table/List

Empty State

* No Products

---

## Card

### Top Products by Revenue

Purpose

* Products generating highest revenue

Visualization

* Ranked Chart

Empty State

* No Products

---

## Card

### Slow-moving Products

Purpose

* Lowest selling products

Visualization

* Table/List

Empty State

* No Products

---

# Expense Analysis

## Card

### Top Expenses by Category

Purpose

* Expense category distribution

Visualization

* Pie / Bar Chart

Empty State

* No Expense recorded in the date range selected

---

# Payment Analysis

## Card

### Payment Methods

Purpose

* Amount collected by payment mode

Visualization

* Pie Chart

Empty State

* No Payment Methods

---

## Card

### Peak Performing Days

Purpose

* Best payment collection days

Visualization

* Calendar / Bar Chart

Empty State

* No Customers

---

## Card

### Recurring Customers

Purpose

* Frequent paying customers

Visualization

* Ranked List

Empty State

* No Regular Customers

---

## Card

### Top Customers by Sales

Purpose

* Highest revenue generating customers

Visualization

* Ranked List

Empty State

* No Customers

---

# Inventory Analytics

## Card

### Products Sold

Purpose

* Product sales count

---

## Card

### Pending Invoices

Purpose

* Outstanding invoices

---

## Card

### Cash In

Purpose

* Cash received

---

## Card

### Cash Out

Purpose

* Cash spent

---

## Card

### Customers

Purpose

* Customer count

---

## Card

### Invoices

Purpose

* Invoice count

---

# Usage Analytics

## Swipe Usage

### Swipe Invoices Graph

Visualization

* GitHub-style contribution heatmap

Purpose

* Daily application usage
* Invoice creation activity
* Business activity timeline

---

# Complete Dashboard Widget Inventory

| #  | Widget                   |
| -- | ------------------------ |
| 1  | Cash In                  |
| 2  | Cash Out                 |
| 3  | Products Sold            |
| 4  | Customers                |
| 5  | Pending Invoices         |
| 6  | Invoices                 |
| 7  | Reports Overview         |
| 8  | Total Sales              |
| 9  | Total Purchases          |
| 10 | Total Expenses           |
| 11 | Total Indirect Income    |
| 12 | Payment Methods          |
| 13 | Peak Performing Days     |
| 14 | Recurring Customers      |
| 15 | Top Customers by Sales   |
| 16 | Top Categories by Sales  |
| 17 | Top Products by Sales    |
| 18 | Products Expiring Soon   |
| 19 | Low Inventory            |
| 20 | Top Products by Revenue  |
| 21 | Top Expenses by Category |
| 22 | Slow-moving Products     |
| 23 | Swipe Usage              |
| 24 | Swipe Invoices Graph     |

These widgets together form a comprehensive business intelligence dashboard covering **Sales Analytics, Purchase Analytics, Customer Analytics, Inventory Analytics, Product Analytics, Expense Analytics, Payment Analytics, Revenue Analytics, Operational Analytics, and Usage Analytics**.



# Complete UI Layout Breakdown

---

# 1. Page Overview

**Page Title**

* **GSTR - 1**

**Module**

* Reports
* Taxes
* GSTR-1

**Purpose**

This page is used to generate, review, export, download, and share the **GST GSTR-1 Report**. It allows the user to:

* Select a reporting date range.
* View GST return data across multiple GST sections.
* Download reports.
* Download JSON for GST filing.
* Share reports.
* Review totals.
* Read GST calculation notes and validation rules.

**Total Visible Major Sections**

| Section                  |  Count |
| ------------------------ | -----: |
| Left Navigation Sidebar  |      1 |
| Top Header               |      1 |
| GST Filing Banner        |      1 |
| Report Header            |      1 |
| Date Filter              |      1 |
| GST Section Tabs         |      1 |
| Data Table               |      1 |
| Totals Card              |      1 |
| Important Notes Section  |      1 |
| Information Cards        |      9 |
| **Total Major Sections** | **10** |

---

# 2. Section-wise Analysis

---

# Section 1 — Left Navigation Sidebar

## Heading

**Back to Home**

---

### Group Heading

**REPORTS**

---

### Expanded Menu

**Taxes**

Contains:

1. GSTR - 1
2. GSTR - 2B
3. GSTR - 3B
4. GSTR - 7
5. Sale Summary by HSN
6. TDS Receivable
7. TDS Payable
8. TCS Receivable
9. TCS Payable

---

### Collapsed Menus

* Transaction Reports
* Bill-wise Item Reports
* Item Reports
* Party Reports
* Profit & Loss (P.L) Reports
* Payments Reports
* Summary Reports
* Day Book

---

Bottom Navigation

* Share History

---

# Section 2 — GST Filing Promotion Banner

Rows: **1**

Columns: **2**

---

## Left Column

### Heading

**File your GSTR-1 Directly from Swipe**

Description

**Complete your GSTR1 filings from Swipe in 5 minutes**

Social Proof

* Four profile avatars
* **Abhishek Dutta and thousands of businesses file GSTR1 via Swipe**

---

## Right Column

Button

**File Now**

Type

Primary

---

# Section 3 — Report Header

Rows: **1**

Columns: **2**

---

Left

Heading

**GSTR - 1**

Information icon beside heading

---

Right

Buttons

1. Download Report
2. Download JSON
3. Share

---

# Section 4 — Date Filter

Rows

1

Columns

2

---

### Column 1

Label

**Date Range**

Field Type

Date Range Picker

Visible Values

```
01-05-2026
→
31-05-2026
```

Calendar icon

---

# Section 5 — GST Tabs

Visible Tabs

1. B2B
2. B2CL
3. B2CS
4. CDNR
5. CDNUR
6. CONSOLIDATED
7. DOC ISSUE
8. EXPORT
9. HSN B2B
10. HSN B2C
11. NIL EXEMPTED

Current Active Tab

**B2B**

---

# Section 6 — Main Report Table

## Table Title

B2B

---

### Visible Column Headers

1. GSTIN/UIN of Recipient
2. Receiver Name
3. Invoice Number
4. Invoice date
5. Invoice Value
6. Place Of Supply
7. Reverse Charge

---

Sorting

Visible

* Invoice Number
* Invoice Date

---

Horizontal Scroll

Visible

---

Vertical Scroll

Visible

---

Rows

No visible records

---

# Section 7 — Totals Card

Position

Bottom-right

Heading

**Totals**

Contains

* Pie Chart icon
* Information icon

No totals displayed because no data exists.

---

# Section 8 — Important Notes

Heading

**Important Notes**

Contains **9 informational cards**

---

## Card 1

Heading

**Indicative Data**

Text

> This data is based on records in Swipe and is indicative only. Actual GSTR2A/2B calculations happen on the GST portal based on vendor filings.

Icon

Information

---

## Card 2

Heading

**Format**

Text

> The report format complies with the GST Offline Tool requirements.

Icon

Purple document icon

---

## Card 3

Heading

**Credit Notes**

Text

> Please verify Credit Notes manually. They adjust original invoices and must be accurately reflected for GST compliance.

Icon

Warning

---

## Card 4

Heading

**Potential Mismatches**

Text

> Mismatches between Sales and HSN Summaries (often due to Credit Notes without HSN) can trigger notices. Review carefully.

Icon

Red Warning

---

## Card 5

Heading

**Calculations**

Text

> Totals depend on selected filters. Extra discounts and round-offs are excluded from GSTR-1.

Icon

Green Calculator

---

## Card 6

Heading

**GSTR-3B**

Text

> GSTR-3B is calculated on the GST portal based on your GSTR-1 and GSTR-2B. Data here is for reference.

Icon

Purple GST icon

---

## Card 7

Heading

**Unit Codes**

Text

> Only GST-supported unit codes are used. Invalid ones become "OTH". Check valid codes here.

Icon

Blue link icon

---

## Card 8

Heading

**Tax Grouping**

Text

> Data is grouped by tax rate. Duplicate records for multi-rate invoices are expected. Invoice values are for reference only.

Icon

Orange stacked layers

---

## Card 9

Heading

**Amount Mismatch**

Text

> Differences between HSN B2C and B2CS sections may occur if products lack valid HSN codes.

Icon

Red GST icon

---

# 3. Buttons & Actions

| Button          | Type      | Position | Alignment |
| --------------- | --------- | -------- | --------- |
| File Now        | Primary   | Banner   | Right     |
| Download Report | Secondary | Header   | Right     |
| Download JSON   | Secondary | Header   | Right     |
| Share           | Secondary | Header   | Right     |

---

# 4. Tables

## Table

### Title

B2B

---

Columns

1. GSTIN/UIN of Recipient
2. Receiver Name
3. Invoice Number
4. Invoice date
5. Invoice Value
6. Place Of Supply
7. Reverse Charge

---

Search

Not visible

---

Filters

Date Range only

---

Sorting

Invoice Number

Invoice Date

---

Pagination

Not visible

---

Bulk Actions

None

---

Row Selection

None

---

Status Badges

None

---

Horizontal Scroll

Yes

---

Vertical Scroll

Yes

---

# 5. Navigation Elements

## Sidebar

* Back to Home
* REPORTS
* Taxes

  * GSTR - 1
  * GSTR - 2B
  * GSTR - 3B
  * GSTR - 7
  * Sale Summary by HSN
  * TDS Receivable
  * TDS Payable
  * TCS Receivable
  * TCS Payable
* Transaction Reports
* Bill-wise Item Reports
* Item Reports
* Party Reports
* Profit & Loss(P.L) Reports
* Payments Reports
* Summary Reports
* Day Book
* Share History

---

Page Tabs

* B2B
* B2CL
* B2CS
* CDNR
* CDNUR
* CONSOLIDATED
* DOC ISSUE
* EXPORT
* HSN B2B
* HSN B2C
* NIL EXEMPTED

---

# 6. Cards, Panels & Components

## Components Found

* Left Sidebar Navigation
* Promotional Banner
* Report Header
* Date Range Picker
* Tab Navigation
* Scrollable Data Grid
* Totals Summary Card
* Information Tooltip Icons
* Horizontal Scrollbar
* Vertical Scrollbar
* Nine Information Cards
* User Avatar Group
* Calendar Picker
* Download Buttons
* Share Button

No visible:

* Modal
* Accordion
* Progress Bar
* Upload Area
* Rich Text Editor

---

# 7. Layout Structure

```
Full Width Layout

├── Left Sidebar (fixed)

└── Main Content

     ├── GST Filing Banner

     ├── Report Header

     ├── Date Filter

     ├── GST Tabs

     ├── Large Data Grid

     ├── Totals Card

     └── Important Notes
            ├── 3 Columns
            ├── 3 Rows
            └── 9 Info Cards
```

Grid Summary

* Sidebar: 1 column
* Banner: 2 columns
* Header: 2 columns
* Filter: 2 columns
* Notes: 3-column responsive grid

---

# 8. Complete Field Inventory

| Label        | Field Type        | Section     | Row | Column |
| ------------ | ----------------- | ----------- | --: | -----: |
| Date Range   | Date Range Picker | Date Filter |   1 |      1 |
| B2B          | Tab               | GST Tabs    |   1 |      1 |
| B2CL         | Tab               | GST Tabs    |   1 |      2 |
| B2CS         | Tab               | GST Tabs    |   1 |      3 |
| CDNR         | Tab               | GST Tabs    |   1 |      4 |
| CDNUR        | Tab               | GST Tabs    |   1 |      5 |
| CONSOLIDATED | Tab               | GST Tabs    |   1 |      6 |
| DOC ISSUE    | Tab               | GST Tabs    |   1 |      7 |
| EXPORT       | Tab               | GST Tabs    |   1 |      8 |
| HSN B2B      | Tab               | GST Tabs    |   1 |      9 |
| HSN B2C      | Tab               | GST Tabs    |   1 |     10 |
| NIL EXEMPTED | Tab               | GST Tabs    |   1 |     11 |

---

# 9. UI Observations

### Positive

* Excellent visual hierarchy.
* Good spacing throughout.
* Consistent card design.
* Logical report workflow.
* Sticky-style report toolbar appearance.
* Clean GST tab navigation.
* Helpful compliance notes.
* Icons improve readability.
* Scrollbars indicate wide report support.

### Missing / Empty States

* No report records displayed.
* Totals card contains only heading.
* No search within report table.
* No pagination visible.
* No row actions.
* No export format selector beyond JSON/report.

### Hidden / Disabled

* Information icons visible.
* Horizontal scrollbar visible.
* Vertical scrollbar visible.
* Empty table body.

---

# 10. Text Wireframe (ASCII)

```text
──────────────────────────────────────────────────────────────────────────────
                     File your GSTR-1 Directly from Swipe
 Complete your GSTR1 filings from Swipe in 5 minutes

 [Avatars] Abhishek Dutta and thousands of businesses file GSTR1 via Swipe

                                                   [ File Now ]
──────────────────────────────────────────────────────────────────────────────

GSTR - 1

                           [Download Report]
                           [Download JSON]
                           [Share]

Date Range

┌──────────────────────────────────────────────┐
│ 01-05-2026  →  31-05-2026            📅      │
└──────────────────────────────────────────────┘

──────────────────────────────────────────────────────────────────────────────

[B2B] [B2CL] [B2CS] [CDNR] [CDNUR] [CONSOLIDATED]
[DOC ISSUE] [EXPORT] [HSN B2B] [HSN B2C] [NIL EXEMPTED]

──────────────────────────────────────────────────────────────────────────────

┌────────────────────────────────────────────────────────────────────────────┐
│ GSTIN/UIN │ Receiver │ Invoice No │ Invoice Date │ Invoice Value │ POS ...│
│                                                                    │
│                                                                    │
│                     No Report Data                                 │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘

                                         ┌────────────────────────────┐
                                         │  Totals                   │
                                         └────────────────────────────┘

──────────────────────────────────────────────────────────────────────────────
Important Notes

┌──────────────────────┬──────────────────────┬──────────────────────┐
│ Indicative Data      │ Format               │ Credit Notes         │
├──────────────────────┼──────────────────────┼──────────────────────┤
│ Potential            │ Calculations         │ GSTR-3B              │
│ Mismatches           │                      │                      │
├──────────────────────┼──────────────────────┼──────────────────────┤
│ Unit Codes           │ Tax Grouping         │ Amount Mismatch      │
└──────────────────────┴──────────────────────┴──────────────────────┘
```

This analysis preserves all visible headings, labels, buttons, navigation items, tabs, table headers, information cards, and on-screen text present in the uploaded screenshot without introducing elements that are not visible.



# Complete UI Layout Breakdown

---

# 1. Page Overview

## Page Title

**Company Details**

---

## Module

* Settings / Profile
* Company Profile
* Company Details

---

## Purpose

This page is used to configure and manage the company's primary profile information that will be used throughout the application, including:

* Company branding
* GST information
* Contact information
* Business information
* Billing & Shipping addresses
* Company logo
* Default company selection
* Custom fields

---

## Total Major Sections

| Section                  |  Count |
| ------------------------ | -----: |
| Left Settings Navigation |      1 |
| Promotional Banner       |      1 |
| Company Details Form     |      1 |
| Company Logo Upload      |      1 |
| Basic Information Form   |      1 |
| Custom Fields Panel      |      1 |
| Billing Details Card     |      1 |
| Shipping Details Panel   |      1 |
| Save Action Area         |      1 |
| Footer                   |      1 |
| **Total Major Sections** | **10** |

---

# 2. Section-wise Analysis

---

# Section 1 — Left Settings Navigation

## Top Navigation

* **Back to Home**

---

## Group: Profile

Menu Items

1. Company Details *(Selected)*
2. User Profile
3. All Users / Roles

---

## Group: General Settings

1. Preferences
2. Thermal Print Settings
3. Barcode Settings
4. Signatures
5. Notes & Terms
6. Auto Reminders 🔒

---

## Group: Banks and Payments

1. Banks
2. Swipe Wallet

---

## Group: Integrations & Apps

1. Swipe AI
2. Payment Gateway 🔒
3. Tally Integration 🔒
4. API & Webhooks

---

## Group: Others

1. More
2. Advanced Features

---

# Section 2 — Promotional Banner

Rows: **1**

Columns: **2**

### Left

Text

**Create unlimited E-way bills and E-invoices on mobile & web**

### Right

Button

**Go Premium 🚀**

Type

Primary

---

# Section 3 — Company Details Form

## Heading

**Company Details**

Rows: **11**

Columns: **2**

---

## Row 1 (2 Columns)

### Column 1

**Company Logo :**

Field Type

Image Upload

Visible Control

```
+
Upload
```

---

### Column 2

Empty

---

## Row 2 (2 Columns)

### Column 1

***Brand Name :**

Field Type

Text Input

Required

Yes

Default Value

```
MARUF DRESSES
```

---

## Row 3

### Column 1

***Company Name :**

Field Type

Text Input

Required

Yes

Default Value

```
MARUF DRESSES
```

---

## Row 4

### Column 1

**Company Phone :**

Composite Input

#### Sub Column 1

Country Code

Dropdown

Default

```
+91
```

#### Sub Column 2

Phone Number

Textbox

Default

```
9114849152
```

---

## Row 5

### Column 1

**Company Email :**

Field Type

Email Textbox

Placeholder

```
Company Email Address
```

No value entered

---

## Row 6

### Column 1

**GSTIN :**

Textbox

Default

```
19ARVPB8949D1Z7
```

#### Right Side Button

**Fetch Details**

Secondary Button

---

## Row 7

### Column 1

**Business Type :**

Dropdown

Placeholder

Empty

---

## Row 8

### Column 1

**Alternative Contact Number :**

Textbox

Placeholder

```
Alternate contact numbers
```

---

## Row 9

### Column 1

**Website :**

Textbox

Placeholder

```
Website
```

---

## Row 10

### Column 1

**PAN Number :**

Textbox

Placeholder

```
PAN Number
```

---

## Row 11

### Column 1

**Make Default Company :**

Toggle Switch

Default State

OFF

Helper Text

> By switching it ON, this company will be selected by default while logging in

---

# Section 4 — Custom Fields

Rows

1

Columns

2

---

Heading

**Custom Fields**

Right Action

**+ Custom Fields**

Button Type

Outline / Link Button

---

# Section 5 — Billing Details

Heading

**Billing Details**

Rows

1

Columns

1

---

Address Card

```
SANKRAIL

SANRAIL CHAMPATALA, HOWRAH

Howrah

19-WEST BENGAL-711313

India
```

Actions

* Edit
* Delete
* Copy to Shipping

---

# Section 6 — Shipping Details

Heading

**Shipping Details**

Rows

1

Columns

1

---

Button

**+ Shipping Address**

Type

Outline Button

---

# Section 7 — Bottom Actions

Rows

1

Columns

1

Buttons

**Save & Update**

Primary Button

---

# 3. Buttons & Actions

| Button             | Type        | Position         | Alignment |
| ------------------ | ----------- | ---------------- | --------- |
| Go Premium 🚀      | Primary     | Banner           | Right     |
| Upload             | Upload      | Logo             | Center    |
| Fetch Details      | Secondary   | GSTIN Row        | Right     |
| + Custom Fields    | Outline     | Custom Fields    | Right     |
| Edit               | Link        | Billing Card     | Left      |
| Delete             | Danger Link | Billing Card     | Left      |
| Copy to Shipping   | Link        | Billing Card     | Left      |
| + Shipping Address | Outline     | Shipping Section | Left      |
| Save & Update      | Primary     | Bottom           | Left      |

---

# 4. Tables

**No traditional data tables are present.**

---

# 5. Navigation Elements

## Sidebar

### Back Navigation

* Back to Home

---

### Profile

* Company Details *(Active)*
* User Profile
* All Users / Roles

---

### General Settings

* Preferences
* Thermal Print Settings
* Barcode Settings
* Signatures
* Notes & Terms
* Auto Reminders 🔒

---

### Banks and Payments

* Banks
* Swipe Wallet

---

### Integrations & Apps

* Swipe AI
* Payment Gateway 🔒
* Tally Integration 🔒
* API & Webhooks

---

### Others

* More
* Advanced Features

---

# 6. Cards, Panels & Components

## Components Found

* Fixed Sidebar
* Promotional Banner
* Company Details Form Card
* Upload Placeholder
* Country Code Selector
* Text Inputs
* Dropdown
* Toggle Switch
* Custom Fields Panel
* Billing Address Card
* Shipping Address Panel
* Footer
* Floating WhatsApp Button

No visible

* Modal
* Accordion
* Table
* Progress Bar
* Rich Text Editor

---

# 7. Layout Structure

```
Full Width Layout

├── Left Settings Sidebar

└── Main Content

     ├── Promotional Banner

     ├── Company Details Heading

     ├── Company Information Form

     │      Logo Upload
     │      Brand
     │      Company
     │      Phone
     │      Email
     │      GSTIN
     │      Business Type
     │      Alternate Contact
     │      Website
     │      PAN
     │      Default Company Toggle

     ├── Custom Fields

     ├── Billing Details Card

     ├── Shipping Details

     └── Save Button
```

---

# 8. Complete Field Inventory

| Label                      | Type                             | Section         | Row | Column |
| -------------------------- | -------------------------------- | --------------- | --: | -----: |
| Company Logo               | Image Upload                     | Company Details |   1 |      1 |
| Brand Name                 | Text Input                       | Company Details |   2 |      1 |
| Company Name               | Text Input                       | Company Details |   3 |      1 |
| Company Phone              | Country Dropdown + Phone Textbox | Company Details |   4 |      1 |
| Company Email              | Email Textbox                    | Company Details |   5 |      1 |
| GSTIN                      | Textbox                          | Company Details |   6 |      1 |
| Fetch Details              | Secondary Button                 | Company Details |   6 |      2 |
| Business Type              | Dropdown                         | Company Details |   7 |      1 |
| Alternative Contact Number | Textbox                          | Company Details |   8 |      1 |
| Website                    | Textbox                          | Company Details |   9 |      1 |
| PAN Number                 | Textbox                          | Company Details |  10 |      1 |
| Make Default Company       | Toggle                           | Company Details |  11 |      1 |
| Custom Fields              | Action Button                    | Custom Fields   |   1 |      2 |
| Shipping Address           | Outline Button                   | Shipping        |   1 |      1 |
| Save & Update              | Primary Button                   | Bottom Actions  |   1 |      1 |

---

# 9. UI Observations

## Positive

* Excellent whitespace.
* Clear left-aligned labels.
* Consistent form spacing.
* Logical information hierarchy.
* Required fields clearly marked.
* Good use of placeholders.
* Billing and Shipping sections are visually separated.
* GST verification workflow is clear with **Fetch Details**.
* Upload control is prominent.

## Visible Issues

* No tooltip explaining Business Type.
* Upload area has no supported format or size hint.
* Email field has placeholder only; no validation hint.
* Website field lacks protocol guidance.
* PAN field has no format hint.
* Billing address card occupies relatively little space compared to the page.
* Large unused whitespace below Shipping Details.

## Hidden / Disabled

* Toggle **Make Default Company** is OFF.
* Empty Business Type dropdown.
* Empty Email, Website, PAN, Alternative Contact fields.

---

# 10. Text Wireframe (ASCII Layout)

```text
──────────────────────────────────────────────────────────────────────────────
                Create unlimited E-way bills and E-invoices

                                                [ Go Premium 🚀 ]
──────────────────────────────────────────────────────────────────────────────

                     COMPANY DETAILS

Company Logo

┌──────────────┐
│      +       │
│    Upload    │
└──────────────┘

Brand Name *
┌────────────────────────────────────────────────────────────┐
│ MARUF DRESSES                                              │
└────────────────────────────────────────────────────────────┘

Company Name *
┌────────────────────────────────────────────────────────────┐
│ MARUF DRESSES                                              │
└────────────────────────────────────────────────────────────┘

Company Phone
┌───────┐ ┌──────────────────────────────────────────────────┐
│ +91 ▼ │ │ 9114849152                                       │
└───────┘ └──────────────────────────────────────────────────┘

Company Email
┌────────────────────────────────────────────────────────────┐
│ Company Email Address                                      │
└────────────────────────────────────────────────────────────┘

GSTIN
┌──────────────────────────────────────────────┬─────────────┐
│ 19ARVPB8949D1Z7                              │Fetch Details│
└──────────────────────────────────────────────┴─────────────┘

Business Type
┌────────────────────────────────────────────────────────────┐
│ ▼                                                          │
└────────────────────────────────────────────────────────────┘

Alternative Contact Number
┌────────────────────────────────────────────────────────────┐
│ Alternate contact numbers                                  │
└────────────────────────────────────────────────────────────┘

Website
┌────────────────────────────────────────────────────────────┐
│ Website                                                    │
└────────────────────────────────────────────────────────────┘

PAN Number
┌────────────────────────────────────────────────────────────┐
│ PAN Number                                                 │
└────────────────────────────────────────────────────────────┘

Make Default Company

OFF  ○────────

By switching it ON, this company will be selected by default
while logging in.

──────────────────────────────────────────────────────────────

Custom Fields                          [+ Custom Fields]

──────────────────────────────────────────────────────────────

Billing Details

┌─────────────────────────────────────┐
│ SANKRAIL                            │
│ SANRAIL CHAMPATALA, HOWRAH          │
│ Howrah                             │
│ 19-WEST BENGAL-711313              │
│ India                              │
│ Edit Delete Copy to Shipping       │
└─────────────────────────────────────┘

Shipping Details

[ + Shipping Address ]

──────────────────────────────────────────────────────────────

[ Save & Update ]
```

This breakdown preserves all visible headings, labels, menu items, field labels, placeholder text, default values, helper text, buttons, address content, navigation items, and UI components shown in the screenshot without omitting any visible text or introducing elements that are not present.


# Complete UI Layout Breakdown

---

# 1. Page Overview

## Page Title

**All Users / Roles**

---

## Purpose

This page is used to manage organization users, staff members, and their assigned roles and permissions. It allows administrators to:

* View all users
* Manage staff accounts
* Configure Roles And Permissions
* Add new users
* Upgrade for additional users

---

## Total Major Sections

| Section                  | Count |
| ------------------------ | ----: |
| Left Settings Navigation |     1 |
| Promotional Banner       |     1 |
| Page Header              |     1 |
| Tab Navigation           |     1 |
| Users Data Table         |     1 |
| Upgrade CTA Panel        |     1 |
| Footer                   |     1 |
| Floating WhatsApp Button |     1 |
| **Total Major Sections** | **8** |

---

# 2. Section-wise Analysis

---

# Section 1 — Left Settings Navigation

## Top Navigation

* **Back to Home**

---

## Group: Profile

1. Company Details
2. User Profile
3. **All Users / Roles** *(Selected)*

---

## Group: General Settings

1. Preferences
2. Thermal Print Settings
3. Barcode Settings
4. Signatures
5. Notes & Terms 🔒
6. Auto Reminders 🔒

---

## Group: Banks and Payments

1. Banks
2. Swipe Wallet

---

## Group: Integrations & Apps

1. Swipe AI
2. Payment Gateway 🔒
3. Tally Integration 🔒
4. API & Webhooks
5. More

---

## Group: Others

1. Advanced Features

---

# Section 2 — Promotional Banner

Rows: **1**

Columns: **2**

### Column 1

Text

**Create unlimited E-way bills and E-invoices on mobile & web**

### Column 2

Button

**Go Premium 🚀**

Type

Primary Button

Alignment

Right

---

# Section 3 — Page Header

Rows: **1**

Columns: **2**

### Column 1

Heading

**All Users / Roles**

### Column 2

Button

**+ Add User**

Type

Primary Button

Alignment

Right

---

# Section 4 — Tabs

Rows: **1**

Columns: **2**

| Column | Text                  | Type         |
| ------ | --------------------- | ------------ |
| 1      | All Users             | Tab (Active) |
| 2      | Roles And Permissions | Tab          |

---

# Section 5 — Staff Information

Rows: **1**

Columns: **1**

Text

**Add your staff. Assign Roles. Multiply your business.**

---

# Section 6 — Users Table

## Table Title

No explicit title (under **All Users** tab)

---

### Header Row (6 Columns)

| Column | Header    |
| ------ | --------- |
| 1      | Name      |
| 2      | Mobile    |
| 3      | Email     |
| 4      | Role      |
| 5      | User Type |
| 6      | Actions   |

---

### Data Row 1

#### Column 1

Avatar

**CH**

Name

**Chandan**

---

#### Column 2

Mobile

**9114949151**

---

#### Column 3

Email

Visible value

*(Blank)*

---

#### Column 4

Role

**Admin**

---

#### Column 5

User Type

**Free**

---

#### Column 6

Actions

No visible action buttons inside the row.

---

# Section 7 — Upgrade Panel

Rows: **1**

Columns: **2**

### Column 1

Text

**Looking to add more users?**

---

### Column 2

Button

**Click here to get the best quote**

Type

Promotional CTA Button

---

# Section 8 — Footer

Contents

* Swipe Logo
* **©2026 NextSpeed Technologies Private Limited. All rights reserved.**
* **Data is secured via 'bank-grade' security**

---

# 3. Buttons & Actions

| Button                           | Type            | Position    | Alignment |
| -------------------------------- | --------------- | ----------- | --------- |
| Go Premium 🚀                    | Primary         | Top Banner  | Right     |
| + Add User                       | Primary         | Page Header | Right     |
| All Users                        | Navigation Tab  | Header      | Left      |
| Roles And Permissions            | Navigation Tab  | Header      | Left      |
| Click here to get the best quote | Promotional CTA | Bottom      | Left      |
| Back to Home                     | Navigation      | Sidebar     | Top       |

---

# 4. Tables

## Users Table

### Column Headers

1. Name
2. Mobile
3. Email
4. Role
5. User Type
6. Actions

---

### Search Box

Not visible

---

### Filters

Not visible

---

### Pagination

Not visible

---

### Bulk Actions

Not visible

---

### Sorting

Not visible

---

### Row Selection

Not visible

---

### Status Badges

No badges displayed.

---

### Visible Record Count

1 User

---

# 5. Navigation Elements

## Sidebar

### Back Navigation

* Back to Home

---

### Profile

* Company Details
* User Profile
* **All Users / Roles** *(Selected)*

---

### General Settings

* Preferences
* Thermal Print Settings
* Barcode Settings
* Signatures
* Notes & Terms 🔒
* Auto Reminders 🔒

---

### Banks and Payments

* Banks
* Swipe Wallet

---

### Integrations & Apps

* Swipe AI
* Payment Gateway 🔒
* Tally Integration 🔒
* API & Webhooks
* More

---

### Others

* Advanced Features

---

### Top Header

* Swipe Logo
* Company Name (**MARUF DRESSES**)
* Change Company
* Ask SwipeAI
* Notification Icons
* User Avatar

---

# 6. Cards, Panels & Components

## Components Present

* Fixed Sidebar
* Promotional Banner
* Page Header
* Tab Navigation
* Data Table
* User Avatar
* CTA Banner
* Footer
* Floating WhatsApp Button

---

## Components Not Visible

* Accordion
* Modal
* File Upload
* Rich Text Editor
* Progress Bar
* Alerts
* Charts

---

# 7. Layout Structure

```
Full Width Layout

├── Left Sidebar
│      Back to Home
│      Settings Navigation
│
└── Main Content
       ├── Promotional Banner
       ├── Page Heading
       ├── Tabs
       ├── Staff Description
       ├── Add User Button
       ├── Users Table
       ├── Upgrade CTA
       └── Footer
```

---

# 8. Complete Field Inventory

| Label                 | Field Type           | Section     | Row | Column |
| --------------------- | -------------------- | ----------- | --: | -----: |
| All Users             | Navigation Tab       | Tabs        |   1 |      1 |
| Roles And Permissions | Navigation Tab       | Tabs        |   1 |      2 |
| Name                  | Table Header         | Users Table |   1 |      1 |
| Mobile                | Table Header         | Users Table |   1 |      2 |
| Email                 | Table Header         | Users Table |   1 |      3 |
| Role                  | Table Header         | Users Table |   1 |      4 |
| User Type             | Table Header         | Users Table |   1 |      5 |
| Actions               | Table Header         | Users Table |   1 |      6 |
| Chandan               | Read-only Table Cell | Users Table |   2 |      1 |
| 9114949151            | Read-only Table Cell | Users Table |   2 |      2 |
| Admin                 | Read-only Table Cell | Users Table |   2 |      4 |
| Free                  | Read-only Table Cell | Users Table |   2 |      5 |

---

# 9. UI Observations

## Strengths

* Very clean and minimal layout.
* Good whitespace and readability.
* Primary action (**+ Add User**) is highly visible.
* Tabs clearly separate user management from permission management.
* Sidebar categories are logically grouped.
* Promotional CTA is unobtrusive.

---

## Observations

* No search functionality for users.
* No filters.
* No pagination despite a table layout.
* Email column is empty for the visible record.
* Actions column contains no visible controls.
* Table lacks row hover indicators (not visible).
* No user status (Active/Inactive).
* No role badges or colored chips.
* No bulk selection checkboxes.
* No sorting icons.

---

## Read-only Elements

* User Name
* Mobile
* Role
* User Type

---

## Disabled / Hidden

No disabled controls are visible.

---

# 10. Text Wireframe (ASCII Layout)

```text
──────────────────────────────────────────────────────────────────────────────
Create unlimited E-way bills and E-invoices on mobile & web

                                                [ Go Premium 🚀 ]
──────────────────────────────────────────────────────────────────────────────

                    ALL USERS / ROLES

[ All Users ]   [ Roles And Permissions ]

                                         [ + Add User ]

Add your staff. Assign Roles. Multiply your business.

┌────────────┬──────────────┬────────────┬──────────┬───────────┬──────────┐
│ Name       │ Mobile       │ Email      │ Role     │ User Type │ Actions  │
├────────────┼──────────────┼────────────┼──────────┼───────────┼──────────┤
│ CH Chandan │ 9114949151   │            │ Admin    │ Free      │          │
└────────────┴──────────────┴────────────┴──────────┴───────────┴──────────┘

Looking to add more users?

[ Click here to get the best quote ]

──────────────────────────────────────────────────────────────────────────────

©2026 NextSpeed Technologies Private Limited.
Data is secured via 'bank-grade' security.
```

This analysis includes every visible heading, navigation item, sidebar section, tab, button, table header, row value, promotional text, footer text, and UI component visible in the provided screenshot, without inventing hidden elements or omitting any visible text.



# Complete UI Layout Breakdown

---

# 1. Page Overview

## Page Title

**Thermal Print Settings**

---

## Purpose

This page is used to configure thermal receipt printing preferences for invoices, quotations, POS receipts, purchase documents, and other printed documents. It allows the user to:

* Control which receipt elements appear on printed receipts.
* Configure QR code printing.
* Upload a company logo for receipts.
* Configure branding and printer settings.
* Select printer type.
* Customize receipt notes.

---

## Total Major Sections

| Section                  | Count |
| ------------------------ | ----: |
| Left Navigation Sidebar  |     1 |
| Top Promotional Banner   |     1 |
| Page Header              |     1 |
| Receipt Elements         |     1 |
| Company Logo             |     1 |
| QR Code Options          |     1 |
| Branding & Printer Setup |     1 |
| Footer                   |     1 |
| Floating WhatsApp Button |     1 |
| **Total Major Sections** | **9** |

---

# 2. Section-wise Analysis

---

# Section 1 — Left Navigation Sidebar

## Navigation

### Top

* **Back to Home**

---

### Profile

1. Company Details
2. User Profile
3. All Users / Roles

---

### General Settings

1. Preferences
2. **Thermal Print Settings** *(Selected)*
3. Barcode Settings
4. Signatures
5. Notes & Terms 🔒
6. Auto Reminders 🔒

---

### Banks and Payments

1. Banks
2. Swipe Wallet

---

### Integrations & Apps

1. Swipe AI
2. Payment Gateway 🔒
3. Tally Integration 🔒
4. API & Webhooks
5. More

---

### Others

1. Advanced Features

---

# Section 2 — Promotional Banner

Rows: **1**

Columns: **2**

### Column 1

Text

**Create unlimited E-way bills and E-invoices on mobile & web**

---

### Column 2

Button

**Go Premium 🚀**

Type

Primary Button

Alignment

Right

---

# Section 3 — Page Header

Heading

**Thermal Print Settings**

---

# Section 4 — Receipt Elements

Section Heading

**Receipt Elements**

Description

Configure which information should appear on printed receipts.

---

## Row 1 (2 Columns)

### Column 1

Label

**Terms**

Description

**Enable this option to print the terms and conditions on your receipt.**

Field Type

Toggle Switch

Default

OFF

---

### Column 2

Toggle

OFF

---

## Row 2 (2 Columns)

### Column 1

Label

**Invoice Notes**

Description

**Enable this option to print the invoice notes on your receipt.**

Field Type

Toggle

Default

ON

---

### Column 2

Toggle

ON

---

## Row 3

### Column 1

Label

**Company Details**

Description

**Enable this option to include your company's details on the receipt.**

Field Type

Toggle

Default

ON

---

## Row 4

### Column 1

Label

**Item Description**

Description

**Enable this option to print detailed product descriptions on the receipt.**

Field Type

Toggle

Default

OFF

---

## Row 5

### Column 1

Label

**Taxable Amount**

Description

**Enable this option to display the taxable amount just above the tax amount.**

Field Type

Toggle

Default

ON

---

## Row 6

### Column 1

Label

**Show MRP in thermal print**

Description

**Enable this option to show the MRP for each item on the thermal receipt.**

Field Type

Toggle

Default

OFF

---

## Row 7

### Column 1

Label

**Show Item HSN/SAC**

Description

(Description not fully visible)

Field Type

Toggle

Default

ON

---

## Row 8

### Column 1

Label

(Partially visible)

Description

**Disable this to hide the time on the thermal print and POS receipt. The date will still be shown.**

Field Type

Toggle

Default

ON

---

## Save Button

**Save Changes**

Type

Primary Button

Alignment

Left

---

# Section 5 — Company Logo

Rows: **1**

Columns: **2**

---

### Column 1

Label

**Company Logo**

Description

**(Recommended: Black & White) Upload a logo to print on receipts.**

Field Type

Image Upload

---

### Column 2

Current Uploaded Logo

Circular company logo preview.

Field Type

Image Preview

---

# Section 6 — QR Code Options

Section Heading

**QR Code Options**

---

## Row 1

### Label

**Show Google Reviews QR**

Description

**Enable this to print a Google Reviews QR code for customer feedback.**

Field Type

Toggle

Default

OFF

---

## Row 2

### Label

**Show Payment QR**

Description

**QR code for payment will be shown on the thermal printout for documents (like Invoice, Purchases etc.).**

Field Type

Toggle

Default

ON

---

# Section 7 — Branding & Printer Setup

Heading

**Branding & Printer Setup**

---

## Row 1 (2 Columns)

### Column 1

Label

**Organization Name Font Size**

Description

**Define the font size for your organization name on the receipt.**

Field Type

Number Input

Default Value

**24**

---

### Column 2

Numeric Field

24

---

## Row 2

### Column 1

Label

**Company Name Font Size**

Description

**Define the font size for your company name on the receipt.**

Field Type

Number Input

Default Value

**24**

---

## Row 3

### Column 1

Label

**Select Printer**

Description

**Choose the thermal printer you wish to use for printing receipts.**

Field Type

Dropdown

Default Value

**Thermal Printer 80mm**

---

## Row 4

### Column 1

Label

**Notes**

Description

**Add any additional instructions or information related to the print setup.**

Field Type

Textarea

Placeholder

None visible

Default

Empty

---

## Row 5

Button

**Save Changes**

Type

Primary Button

Alignment

Left

---

# Section 8 — Footer

Contains

* Swipe Logo
* **©2026 NextSpeed Technologies Private Limited. All rights reserved.**
* **Data is secured via 'bank-grade' security**

---

# 3. Buttons & Actions

| Button                          | Type       | Position         | Alignment |
| ------------------------------- | ---------- | ---------------- | --------- |
| Go Premium 🚀                   | Primary    | Top Banner       | Right     |
| Save Changes (Receipt Elements) | Primary    | Receipt Elements | Left      |
| Save Changes (Bottom)           | Primary    | Bottom           | Left      |
| Back to Home                    | Navigation | Sidebar          | Left      |

---

# 4. Tables

No tables are present on this page.

---

# 5. Navigation Elements

## Sidebar

### Back Navigation

* Back to Home

---

### Profile

* Company Details
* User Profile
* All Users / Roles

---

### General Settings

* Preferences
* **Thermal Print Settings**
* Barcode Settings
* Signatures
* Notes & Terms 🔒
* Auto Reminders 🔒

---

### Banks and Payments

* Banks
* Swipe Wallet

---

### Integrations & Apps

* Swipe AI
* Payment Gateway 🔒
* Tally Integration 🔒
* API & Webhooks
* More

---

### Others

* Advanced Features

---

### Top Header

* Swipe Logo
* MARUF DRESSES
* Change Company
* Ask SwipeAI
* Notification Icons
* User Profile

---

# 6. Cards, Panels & Components

## Components Present

* Sidebar
* Promotional Banner
* Toggle Switches
* Number Inputs
* Dropdown
* Textarea
* Image Preview
* Image Upload Area
* Save Buttons
* Footer
* Floating WhatsApp Button

---

## Components Not Present

* Table
* Modal
* Accordion
* Progress Bar
* Charts
* Rich Text Editor

---

# 7. Layout Structure

```text
Full Width Layout

├── Left Sidebar
│      Back to Home
│      Settings Navigation
│
└── Main Content
       ├── Promotional Banner
       ├── Thermal Print Settings
       │
       ├── Receipt Elements
       │     Multiple Toggle Switches
       │
       ├── Company Logo Upload
       │
       ├── QR Code Options
       │
       ├── Branding & Printer Setup
       │      Number Inputs
       │      Printer Dropdown
       │      Notes Textarea
       │
       ├── Save Changes
       │
       └── Footer
```

---

# 8. Complete Field Inventory

| Label                                                  | Field Type   | Section                  | Row | Column |
| ------------------------------------------------------ | ------------ | ------------------------ | --: | -----: |
| Terms                                                  | Toggle       | Receipt Elements         |   1 |      1 |
| Invoice Notes                                          | Toggle       | Receipt Elements         |   2 |      1 |
| Company Details                                        | Toggle       | Receipt Elements         |   3 |      1 |
| Item Description                                       | Toggle       | Receipt Elements         |   4 |      1 |
| Taxable Amount                                         | Toggle       | Receipt Elements         |   5 |      1 |
| Show MRP in thermal print                              | Toggle       | Receipt Elements         |   6 |      1 |
| Show Item HSN/SAC                                      | Toggle       | Receipt Elements         |   7 |      1 |
| (Hide Time on Receipt option – label partially hidden) | Toggle       | Receipt Elements         |   8 |      1 |
| Company Logo                                           | Image Upload | Company Logo             |   1 |      1 |
| Show Google Reviews QR                                 | Toggle       | QR Code Options          |   1 |      1 |
| Show Payment QR                                        | Toggle       | QR Code Options          |   2 |      1 |
| Organization Name Font Size                            | Number Input | Branding & Printer Setup |   1 |      1 |
| Company Name Font Size                                 | Number Input | Branding & Printer Setup |   2 |      1 |
| Select Printer                                         | Dropdown     | Branding & Printer Setup |   3 |      1 |
| Notes                                                  | Textarea     | Branding & Printer Setup |   4 |      1 |

---

# 9. UI Observations

## Strengths

* Clear grouping of related print settings.
* Helpful descriptions under every option.
* Consistent spacing and alignment.
* Simple toggle-based configuration.
* Company logo preview is immediately visible.
* Printer configuration is separated from receipt options.

---

## Observations

* One receipt element label is partially hidden/cut off in the screenshot, while its description is visible.
* No required (`*`) indicators are shown.
* No reset/default button is available.
* Two **Save Changes** buttons are present (top section and bottom section), which may be redundant depending on implementation.
* Number inputs have no visible increment/decrement controls.
* Textarea has no placeholder text.
* No validation messages or helper errors are visible.

---

## Read-only Elements

* Uploaded logo preview.

---

## Hidden / Disabled

* No disabled controls are visible.
* Several toggles are in the OFF state (not disabled).

---

# 10. Text Wireframe (ASCII Layout)

```text
──────────────────────────────────────────────────────────────────────────────
Create unlimited E-way bills and E-invoices on mobile & web

                                               [ Go Premium 🚀 ]
──────────────────────────────────────────────────────────────────────────────

THERMAL PRINT SETTINGS

RECEIPT ELEMENTS

Terms                                  [ OFF ]
Enable this option to print the terms and conditions on your receipt.

Invoice Notes                          [ ON ]
Enable this option to print the invoice notes on your receipt.

Company Details                        [ ON ]

Item Description                       [ OFF ]

Taxable Amount                         [ ON ]

Show MRP in thermal print              [ OFF ]

Show Item HSN/SAC                      [ ON ]

(Hide Time on Receipt)                 [ ON ]

[ Save Changes ]

──────────────────────────────────────────────────────────────

Company Logo

(Recommended: Black & White)
Upload a logo to print on receipts.

[ Uploaded Company Logo ]

──────────────────────────────────────────────────────────────

QR CODE OPTIONS

Show Google Reviews QR                 [ OFF ]

Show Payment QR                        [ ON ]

──────────────────────────────────────────────────────────────

BRANDING & PRINTER SETUP

Organization Name Font Size

[ 24 ]

Company Name Font Size

[ 24 ]

Select Printer

[ Thermal Printer 80mm ▼ ]

Notes

┌────────────────────────────────────────────────────┐
│                                                    │
└────────────────────────────────────────────────────┘

[ Save Changes ]

──────────────────────────────────────────────────────────────

©2026 NextSpeed Technologies Private Limited.

Data is secured via 'bank-grade' security.
```

This breakdown preserves every visible heading, section title, navigation item, field label, helper description, button text, toggle, input, dropdown, footer text, promotional banner text, and UI component shown in the screenshot. Where text is partially obscured in the image (such as one receipt element label), it is explicitly identified as partially visible rather than inferred.




# Complete UI Layout Breakdown

---

# 1. Page Overview

## Page Title

**Barcode Settings**

---

## Purpose

This page allows administrators to configure barcode label generation and printing behavior. It provides options to:

* Control barcode display information.
* Customize printed barcode labels.
* Configure MRP label text.
* Configure font sizes.
* Configure barcode length.
* Save barcode printing preferences.

---

## Total Major Sections

| Section                       | Count |
| ----------------------------- | ----: |
| Left Navigation Sidebar       |     1 |
| Top Promotional Banner        |     1 |
| Page Header                   |     1 |
| Display Options               |     1 |
| Label & Barcode Customization |     1 |
| Save Action Section           |     1 |
| Footer                        |     1 |
| Floating WhatsApp Button      |     1 |
| **Total Major Sections**      | **8** |

---

# 2. Section-wise Analysis

---

# Section 1 — Left Navigation Sidebar

---

## Top Navigation

* **Back to Home**

---

## Group: Profile

1. Company Details
2. User Profile
3. All Users / Roles

---

## Group: General Settings

1. Preferences
2. Thermal Print Settings
3. **Barcode Settings** *(Selected)*
4. Signatures
5. Notes & Terms 🔒
6. Auto Reminders 🔒

---

## Group: Banks and Payments

1. Banks
2. Swipe Wallet

---

## Group: Integrations & Apps

1. Swipe AI
2. Payment Gateway 🔒
3. Tally Integration 🔒
4. API & Webhooks
5. More

---

## Group: Others

1. Advanced Features

---

# Section 2 — Promotional Banner

Rows: **1**

Columns: **2**

### Column 1

Text

**Create unlimited E-way bills and E-invoices on mobile & web**

---

### Column 2

Button

**Go Premium 🚀**

Field Type

Primary Button

Alignment

Right

---

# Section 3 — Page Header

Rows: **1**

Columns: **1**

Heading

**Barcode Settings**

---

# Section 4 — Display Options

---

## Section Heading

**Display Options**

---

### Row 1 (2 Columns)

#### Column 1

Label

**Package Date**

Description

**Enable this to show the package date on the barcode.**

Field Type

Toggle Switch

Required

No

Default Value

**ON**

---

#### Column 2

Toggle

Enabled

---

### Row 2 (2 Columns)

#### Column 1

Label

**Price with Tax**

Description

**Enable this to display the price with tax on the barcode.**

Field Type

Toggle Switch

Required

No

Default Value

**ON**

---

#### Column 2

Toggle

Enabled

---

# Section 5 — Label & Barcode Customization

---

## Section Heading

**Label & Barcode Customization**

---

### Row 1 (2 Columns)

#### Column 1

Label

**MRP Label**

Description

**Turn this on to set a custom MRP label.**

Field Type

Toggle Switch

Default Value

**ON**

---

#### Column 2

Toggle

Enabled

---

### Row 2 (2 Columns)

#### Column 1

Label

*(No visible label beside textbox; associated with "MRP Label")*

Textbox

Value

**MRP**

Field Type

Single-line Text Input

Required

No

Placeholder

None visible

Default Value

**MRP**

---

#### Column 2

Empty

---

### Row 3 (2 Columns)

#### Column 1

Label

**MRP Font Size**

Description

**Set the font size for the MRP.**

Field Type

Number Input

---

#### Column 2

Value

**16**

---

### Row 4 (2 Columns)

#### Column 1

Label

**Product Name Font Size**

Description

**Set the font size for the product name.**

Field Type

Number Input

---

#### Column 2

Value

**16**

---

### Row 5 (2 Columns)

#### Column 1

Label

**Barcode Length**

Description

**Set the length of the barcode text (between 4 and 10).**

Field Type

Number Input

---

#### Column 2

Value

**10**

---

# Section 6 — Action Section

Rows: **1**

Columns: **1**

Button

**Save Changes**

Type

Primary Button

Alignment

Left

---

# Section 7 — Footer

Contains

* Swipe Logo
* **©2026 NextSpeed Technologies Private Limited. All rights reserved.**
* **Data is secured via 'bank-grade' security**

---

# 3. Buttons & Actions

| Button Text   | Button Type | Position           | Alignment |
| ------------- | ----------- | ------------------ | --------- |
| Go Premium 🚀 | Primary     | Promotional Banner | Right     |
| Save Changes  | Primary     | Bottom of Form     | Left      |
| Back to Home  | Navigation  | Sidebar            | Left      |

---

# 4. Tables

There are **no tables** present on this page.

---

# 5. Navigation Elements

---

## Left Sidebar

### Top

* Back to Home

---

### Profile

* Company Details
* User Profile
* All Users / Roles

---

### General Settings

* Preferences
* Thermal Print Settings
* **Barcode Settings** *(Selected)*
* Signatures
* Notes & Terms 🔒
* Auto Reminders 🔒

---

### Banks and Payments

* Banks
* Swipe Wallet

---

### Integrations & Apps

* Swipe AI
* Payment Gateway 🔒
* Tally Integration 🔒
* API & Webhooks
* More

---

### Others

* Advanced Features

---

## Top Header

Contains

* Swipe Logo
* MARUF DRESSES
* Change Company
* Ask SwipeAI Search
* Notification Icons
* User Profile

---

# 6. Cards, Panels & Components

---

## Components Present

* Left Sidebar
* Promotional Banner
* Settings Form
* Toggle Switches
* Text Input
* Number Inputs
* Primary Action Button
* Footer
* Floating WhatsApp Button

---

## Components Not Present

* Tables
* Accordions
* Modals
* Alerts
* Progress Bars
* Charts
* Upload Controls
* Rich Text Editor
* Date Picker
* Dropdown
* File Upload Area

---

# 7. Layout Structure

```text
Full Width Layout

├── Left Sidebar
│      Back to Home
│      Settings Navigation
│
└── Main Content
       ├── Promotional Banner
       ├── Barcode Settings
       │
       ├── Display Options
       │      Package Date Toggle
       │      Price with Tax Toggle
       │
       ├── Label & Barcode Customization
       │      MRP Label Toggle
       │      MRP Textbox
       │      MRP Font Size
       │      Product Name Font Size
       │      Barcode Length
       │
       ├── Save Changes Button
       │
       └── Footer
```

---

# 8. Complete Field Inventory

| Exact Label Text       | Field Type    | Section                       | Row | Column |
| ---------------------- | ------------- | ----------------------------- | --: | -----: |
| Package Date           | Toggle Switch | Display Options               |   1 |      1 |
| Price with Tax         | Toggle Switch | Display Options               |   2 |      1 |
| MRP Label              | Toggle Switch | Label & Barcode Customization |   1 |      1 |
| MRP                    | Text Input    | Label & Barcode Customization |   2 |      1 |
| MRP Font Size          | Number Input  | Label & Barcode Customization |   3 |      1 |
| Product Name Font Size | Number Input  | Label & Barcode Customization |   4 |      1 |
| Barcode Length         | Number Input  | Label & Barcode Customization |   5 |      1 |

---

# 9. UI Observations

## Positive Observations

* Clean single-column settings layout.
* Logical separation into **Display Options** and **Label & Barcode Customization**.
* Helpful descriptions under every configurable option.
* Consistent spacing and typography.
* Easy-to-understand toggle switches.

---

## Missing Elements

* No reset/default settings button.
* No live barcode preview.
* No validation helper beside number inputs.
* No tooltip explaining valid barcode formats.
* No save confirmation indicator.
* No unsaved changes indicator.

---

## Alignment

* Labels align consistently on the left.
* Input controls align consistently on the right.
* Uniform vertical spacing between configuration rows.

---

## Read-only Fields

None visible.

---

## Disabled Controls

None visible.

---

## Required Indicators

No required (`*`) indicators are visible.

---

## Default Values Visible

| Field                  | Default Value |
| ---------------------- | ------------- |
| Package Date           | ON            |
| Price with Tax         | ON            |
| MRP Label              | ON            |
| MRP Text               | MRP           |
| MRP Font Size          | 16            |
| Product Name Font Size | 16            |
| Barcode Length         | 10            |

---

# 10. Text Wireframe (ASCII Layout)

```text
────────────────────────────────────────────────────────────────────────────
Create unlimited E-way bills and E-invoices on mobile & web

                                               [ Go Premium 🚀 ]
────────────────────────────────────────────────────────────────────────────

                        BARCODE SETTINGS

DISPLAY OPTIONS

Package Date
Enable this to show the package date on the barcode.
                                                   [ ON ]

Price with Tax
Enable this to display the price with tax on the barcode.
                                                   [ ON ]

────────────────────────────────────────────────────────────────────────────

LABEL & BARCODE CUSTOMIZATION

MRP Label
Turn this on to set a custom MRP label.
                                                   [ ON ]

MRP
┌──────────────────────────────────────────────┐
│ MRP                                          │
└──────────────────────────────────────────────┘

MRP Font Size
┌──────────────┐
│ 16           │
└──────────────┘

Product Name Font Size
┌──────────────┐
│ 16           │
└──────────────┘

Barcode Length
Set the length of the barcode text (between 4 and 10).

┌──────────────┐
│ 10           │
└──────────────┘

[ Save Changes ]

────────────────────────────────────────────────────────────────────────────

©2026 NextSpeed Technologies Private Limited.

Data is secured via 'bank-grade' security.
```

This analysis includes every visible heading, section title, navigation item, sidebar entry, descriptive text, field label, helper text, button label, toggle state, default value, footer text, promotional banner text, and UI component shown in the screenshot. No hidden or non-visible elements have been inferred.



# Complete UI Layout Breakdown

---

# 1. Page Overview

## Page Title

**Preferences**

---

## Purpose

This page allows administrators to configure global business preferences that affect document creation, products, subscriptions, POS, custom links, notifications, email, and AI-related behavior. The currently active view is the **Document** preferences tab, where users can configure document defaults, operational behaviors, transaction settings, and PDF file naming conventions.

---

## Total Sections / Cards / Forms

| Component                      |  Count |
| ------------------------------ | -----: |
| Left Navigation Sidebar        |      1 |
| Top Promotional Banner         |      1 |
| Main Page Header               |      1 |
| Top Preference Tabs            |      1 |
| Secondary Category Tabs        |      1 |
| Document Defaults Section      |      1 |
| Configurations Section         |      1 |
| File Naming Convention Section |      1 |
| Footer                         |      1 |
| Floating WhatsApp Button       |      1 |
| **Total Major Sections**       | **10** |

---

# 2. Section-wise Analysis

---

# Section 1 — Left Navigation Sidebar

## Top Navigation

* **Back to Home**

---

### Profile

* Company Details
* User Profile
* All Users / Roles

---

### General Settings

* **Preferences** *(Selected)*
* Thermal Print Settings
* Barcode Settings
* Signatures
* Notes & Terms 🔒
* Auto Reminders 🔒

---

### Banks and Payments

* Banks
* Swipe Wallet

---

### Integrations & Apps

* Swipe AI
* Payment Gateway 🔒
* Tally Integration 🔒
* API & Webhooks
* More

---

### Others

* Advanced Features

---

# Section 2 — Promotional Banner

**Rows:** 1

**Columns:** 2

### Column 1

**Create unlimited E-way bills and E-invoices on mobile & web**

### Column 2

**Go Premium 🚀**

**Field Type:** Primary Button

---

# Section 3 — Page Header

Heading

**Preferences**

---

# Section 4 — Primary Preference Tabs

Rows: **1**

Columns: **8**

| Column | Tab                     |
| ------ | ----------------------- |
| 1      | **Document** *(Active)* |
| 2      | Products & Inventory    |
| 3      | Subscriptions           |
| 4      | POS                     |
| 5      | Customise Links         |
| 6      | Notifications           |
| 7      | Email                   |
| 8      | AI                      |

---

# Section 5 — Secondary Tabs

Rows: **1**

Columns: **4**

| Column | Tab                  |
| ------ | -------------------- |
| 1      | **All** *(Selected)* |
| 2      | Sales                |
| 3      | Purchases            |
| 4      | Conversions          |

---

# Section 6 — Document Defaults

## Section Heading

**Document Defaults**

---

### Row 1 (2 Columns)

#### Column 1

Label

**Round Off**

Description

**Auto round off amounts for accurate calculations across documents.**

Field Type

Toggle Switch

Default Value

**ON**

---

### Row 2 (2 Columns)

#### Column 1

Label

**Extra Discount Type**

Description

**Choose the default type of extra discount applied when creating documents.**

#### Column 2

Dropdown

Default Value

**Percent**

---

### Row 3 (2 Columns)

#### Column 1

Label

**Show Suggestions**

Description

**Enable to see suggestions for document custom headers while creating documents.**

Field Type

Toggle

Default Value

**ON**

---

### Row 4 (2 Columns)

#### Column 1

Label

**Default Due Date**

Description

**Set a default due date while creating documents.**

#### Column 2

Dropdown

Default Value

**Same Day**

---

### Row 5 (2 Columns)

#### Column 1

Primary Button

**Save Changes**

---

### Row 6 (2 Columns)

#### Column 1

Label

**Discount Type**

Description

**Select how discounts apply: on unit price, price with tax, net amount, or total amount.**

#### Column 2

Dropdown

Default Value

**Total Amount**

---

# Section 7 — Configurations

## Section Heading

**Configurations**

---

### Row 1 (2 Columns)

#### Column 1

Label

**Sort Transactions By**

Description

**Transactions will be shown in the order selected here.**

#### Column 2

Dropdown

Default Value

**Created Date**

---

### Row 2 (2 Columns)

#### Column 1

Label

**Send SMS To Customer**

Description

**If enabled, send SMS option will be ON by default, while creating a payment.**

#### Column 2

Toggle

Default

**OFF**

---

### Row 3 (2 Columns)

#### Column 1

Label

**Mandatory Remarks on document cancellation**

Description

**If enabled, remarks will be required when canceling documents like invoices, purchases, quotations, etc.**

#### Column 2

Toggle

Default

**OFF**

---

### Row 4 (2 Columns)

#### Column 1

Label

**Add Quantity Manually on Barcode Scan**

Description

**By default, scanned items are set to quantity 1. Enable this to enter quantity manually while creating documents.**

#### Column 2

Toggle

Default

**OFF**

---

# Section 8 — File Naming Convention

## Section Heading

**File Naming Convention**

---

## Subsection 1

### Heading

**Document PDF File Name**

Description

**Customize the filenames for downloaded invoice and other document PDFs using dynamic placeholder tags.**

---

### Row 1

Textbox

Placeholder

**e.g. {document_title}_{serial_number}**

---

### Row 2

Placeholder Chips

* * Document Title
* * Serial Number
* * Party Name
* * Company Name
* * Document Date
* * Financial Year
* * Generated Date

---

### Row 3

Preview Label

**Live Preview:**

Preview Value

**Invoice_INV-0001_Raj_Traders.pdf**

(Read-only preview)

---

## Subsection 2

### Heading

**Ledger PDF File Name**

Description

**Customize the filenames for downloaded customer, vendor, and party ledger PDFs.**

---

### Row 1

Textbox

Placeholder

**e.g. {ledger_type}*Ledger*{party_name}**

---

### Row 2

Placeholder Chips

* * Ledger Type
* * Party Name
* * From Date
* * To Date
* * Generated Date
* * Company Name
* * Financial Year

---

### Row 3

Preview Label

**Live Preview:**

Preview Value

**Customer_Ledger_Raj_Traders.pdf**

(Read-only preview)

---

### Row 4

Primary Button

**Save Changes**

---

# Section 9 — Footer

Contains

* Swipe Logo
* **©2026 NextSpeed Technologies Private Limited. All rights reserved.**
* **Data is secured via 'bank-grade' security**

---

# 3. Buttons & Actions

| Button        | Type       | Position                         | Alignment |
| ------------- | ---------- | -------------------------------- | --------- |
| Go Premium 🚀 | Primary    | Promotional Banner               | Right     |
| Save Changes  | Primary    | Document Defaults                | Left      |
| Save Changes  | Primary    | Bottom of File Naming Convention | Left      |
| Back to Home  | Navigation | Sidebar                          | Left      |

---

# 4. Tables

There are **no data tables** on this page.

---

# 5. Navigation Elements

## Sidebar

### Profile

* Company Details
* User Profile
* All Users / Roles

### General Settings

* **Preferences**
* Thermal Print Settings
* Barcode Settings
* Signatures
* Notes & Terms 🔒
* Auto Reminders 🔒

### Banks and Payments

* Banks
* Swipe Wallet

### Integrations & Apps

* Swipe AI
* Payment Gateway 🔒
* Tally Integration 🔒
* API & Webhooks
* More

### Others

* Advanced Features

---

## Top Preference Tabs

* Document *(Selected)*
* Products & Inventory
* Subscriptions
* POS
* Customise Links
* Notifications
* Email
* AI

---

## Secondary Tabs

* All *(Selected)*
* Sales
* Purchases
* Conversions

---

## Header

* Swipe Logo
* MARUF DRESSES
* Change Company
* Ask SwipeAI
* Notification Icons
* User Profile

---

# 6. Cards, Panels & Components

## Components Present

* Sidebar Navigation
* Promotional Banner
* Primary Tab Bar
* Secondary Tab Bar
* Toggle Switches
* Dropdown Selects
* Text Inputs
* Placeholder Chips / Tag Tokens
* Live Preview Panels
* Primary Buttons
* Footer
* Floating WhatsApp Button

## Components Not Present

* Tables
* Accordions
* Modals
* Alerts
* Charts
* Progress Bars
* Upload Controls
* Rich Text Editors
* Date Pickers
* Checkboxes
* Radio Buttons

---

# 7. Layout Structure

```text
Full Width Layout
│
├── Left Sidebar
│     ├── Back to Home
│     ├── Profile
│     ├── General Settings
│     ├── Banks & Payments
│     ├── Integrations & Apps
│     └── Others
│
└── Main Content
      ├── Promotional Banner
      ├── Preferences
      ├── Primary Tabs
      ├── Secondary Tabs
      ├── Document Defaults
      ├── Save Changes
      ├── Configurations
      ├── File Naming Convention
      │      ├── Document PDF File Name
      │      ├── Live Preview
      │      ├── Ledger PDF File Name
      │      ├── Live Preview
      │      └── Save Changes
      └── Footer
```

---

# 8. Complete Field Inventory

| Exact Label Text                           | Field Type    | Section                | Row | Column |
| ------------------------------------------ | ------------- | ---------------------- | --: | -----: |
| Round Off                                  | Toggle Switch | Document Defaults      |   1 |      1 |
| Extra Discount Type                        | Dropdown      | Document Defaults      |   2 |      2 |
| Show Suggestions                           | Toggle Switch | Document Defaults      |   3 |      1 |
| Default Due Date                           | Dropdown      | Document Defaults      |   4 |      2 |
| Discount Type                              | Dropdown      | Document Defaults      |   6 |      2 |
| Sort Transactions By                       | Dropdown      | Configurations         |   1 |      2 |
| Send SMS To Customer                       | Toggle Switch | Configurations         |   2 |      2 |
| Mandatory Remarks on document cancellation | Toggle Switch | Configurations         |   3 |      2 |
| Add Quantity Manually on Barcode Scan      | Toggle Switch | Configurations         |   4 |      2 |
| Document PDF File Name                     | Text Input    | File Naming Convention |   1 |      1 |
| Ledger PDF File Name                       | Text Input    | File Naming Convention |   4 |      1 |

---

# 9. UI Observations

## Positive

* Two-level tab navigation clearly separates preference categories.
* Informative helper text beneath every configurable setting.
* Consistent left-label/right-control alignment.
* Live preview panels immediately reflect filename templates.
* Dynamic placeholder chips reduce manual typing errors.
* Logical grouping into **Document Defaults**, **Configurations**, and **File Naming Convention**.

## Missing

* No reset-to-default option.
* No search/filter for preferences.
* No unsaved-changes indicator.
* No confirmation message visible after saving.
* No validation examples for filename placeholders beyond the placeholder text.

## Required Indicators

* No required (`*`) indicators are visible.

## Default Values Visible

| Field                                      | Default Value |
| ------------------------------------------ | ------------- |
| Round Off                                  | ON            |
| Extra Discount Type                        | Percent       |
| Show Suggestions                           | ON            |
| Default Due Date                           | Same Day      |
| Discount Type                              | Total Amount  |
| Sort Transactions By                       | Created Date  |
| Send SMS To Customer                       | OFF           |
| Mandatory Remarks on document cancellation | OFF           |
| Add Quantity Manually on Barcode Scan      | OFF           |

---

# 10. Text Wireframe (ASCII Layout)

```text
────────────────────────────────────────────────────────────────────────────────────
Create unlimited E-way bills and E-invoices on mobile & web
                                                        [ Go Premium 🚀 ]
────────────────────────────────────────────────────────────────────────────────────

                              PREFERENCES

[Document] [Products & Inventory] [Subscriptions] [POS]
[Customise Links] [Notifications] [Email] [AI]

[All] [Sales] [Purchases] [Conversions]

────────────────────────────────────────────────────────────────────────────────────

DOCUMENT DEFAULTS

Round Off                                         [ ON ]

Extra Discount Type
[ Percent ▼ ]

Show Suggestions                                  [ ON ]

Default Due Date
[ Same Day ▼ ]

[ Save Changes ]

Discount Type
[ Total Amount ▼ ]

────────────────────────────────────────────────────────────────────────────────────

CONFIGURATIONS

Sort Transactions By
[ Created Date ▼ ]

Send SMS To Customer                              [ OFF ]

Mandatory Remarks on document cancellation        [ OFF ]

Add Quantity Manually on Barcode Scan             [ OFF ]

────────────────────────────────────────────────────────────────────────────────────

FILE NAMING CONVENTION

Document PDF File Name

┌───────────────────────────────────────────────────────────────┐
│ e.g. {document_title}_{serial_number}                         │
└───────────────────────────────────────────────────────────────┘

[+ Document Title] [+ Serial Number] [+ Party Name]
[+ Company Name] [+ Document Date]
[+ Financial Year] [+ Generated Date]

Live Preview:
Invoice_INV-0001_Raj_Traders.pdf

────────────────────────────────────────────────────────────────

Ledger PDF File Name

┌───────────────────────────────────────────────────────────────┐
│ e.g. {ledger_type}_Ledger_{party_name}                        │
└───────────────────────────────────────────────────────────────┘

[+ Ledger Type] [+ Party Name] [+ From Date]
[+ To Date] [+ Generated Date]
[+ Company Name] [+ Financial Year]

Live Preview:
Customer_Ledger_Raj_Traders.pdf

[ Save Changes ]

────────────────────────────────────────────────────────────────

©2026 NextSpeed Technologies Private Limited.
Data is secured via 'bank-grade' security.
```

This breakdown preserves all visible headings, section titles, helper descriptions, tabs, sidebar items, field labels, placeholder text, chip labels, preview text, button labels, footer text, and navigation elements visible in the provided screenshot without inferring hidden content.



# Complete UI Layout Breakdown

---

# 1. Page Overview

## Page Title

**Preferences**

---

## Purpose

This page configures **Sales-specific Document Preferences**. It controls invoice behavior, product pricing visibility, payment defaults, invoice generation, document types, and automatic customer communication through WhatsApp and Email.

---

## Total Sections / Cards / Forms

| Component                 |  Count |
| ------------------------- | -----: |
| Left Navigation Sidebar   |      1 |
| Top Promotion Banner      |      1 |
| Main Page Header          |      1 |
| Primary Preference Tabs   |      1 |
| Secondary Category Tabs   |      1 |
| Document Defaults Section |      1 |
| Configurations Section    |      1 |
| Action Button Area        |      1 |
| Footer                    |      1 |
| Floating WhatsApp Button  |      1 |
| **Total Major Sections**  | **10** |

---

# 2. Section-wise Analysis

---

# Section 1 — Left Navigation Sidebar

## Navigation

### Top

* Back to Home

---

### Profile

* Company Details
* User Profile
* All Users / Roles

---

### General Settings

* **Preferences** *(Selected)*
* Thermal Print Settings
* Barcode Settings
* Signatures
* Notes & Terms 🔒
* Auto Reminders 🔒

---

### Banks and Payments

* Banks
* Swipe Wallet

---

### Integrations & Apps

* Swipe AI
* Payment Gateway 🔒
* Tally Integration 🔒
* API & Webhooks
* More

---

### Others

* Advanced Features

---

# Section 2 — Promotional Banner

Rows: **1**

Columns: **2**

### Column 1

**Create unlimited E-way bills and E-invoices on mobile & web**

### Column 2

**Go Premium 🚀**

(Button)

---

# Section 3 — Page Header

Heading

**Preferences**

---

# Section 4 — Primary Navigation Tabs

Rows: **1**

Columns: **8**

| Column | Tab                   |
| ------ | --------------------- |
| 1      | Document *(Selected)* |
| 2      | Products & Inventory  |
| 3      | Subscriptions         |
| 4      | POS                   |
| 5      | Customise Links       |
| 6      | Notifications         |
| 7      | Email                 |
| 8      | AI                    |

---

# Section 5 — Secondary Tabs

Rows: **1**

Columns: **4**

| Column | Tab                    |
| ------ | ---------------------- |
| 1      | All                    |
| 2      | **Sales** *(Selected)* |
| 3      | Purchases              |
| 4      | Conversions            |

---

# Section 6 — Document Defaults

## Heading

**Document Defaults**

---

### Row 1 (2 Columns)

#### Column 1

Label

**Negative Quantity**

Description

**Allow adding products with negative quantity in bills.**

#### Column 2

Field Type

Toggle Switch

Default

OFF

---

### Row 2 (2 Columns)

#### Column 1

Label

**Show Purchase Price**

Description

**Show purchase price only to admins while creating documents.**

#### Column 2

Toggle

Default

OFF

---

### Row 3 (2 Columns)

#### Column 1

Label

**Show Margin**

Description

**Show the margin only for admins while creating documents.**

#### Column 2

Toggle

Default

OFF

---

### Row 4 (2 Columns)

#### Column 1

Label

**Warn for Low Selling Price (Web Only)**

Description

**Show a warning if the selling price is lower than the purchase price.**

#### Column 2

Toggle

Default

OFF

---

### Row 5 (2 Columns)

#### Column 1

Label

**Mark as Fully Paid**

Description

**Turns on 'Mark as Fully Paid' by default on the invoice creation page.**

#### Column 2

Toggle

Default

OFF

---

### Row 6 (2 Columns)

#### Column 1

Label

**Use Recently Charged Price**

Description

**Automatically populate the selling price with the customer's last charged price when adding items to invoices.**

#### Column 2

Toggle

Default

OFF

---

# Section 7 — Configurations

## Heading

**Configurations**

---

### Row 1

#### Column 1

Label

**Default Invoice Types**

Description

**Select the default PDF format for generated invoices.**

---

#### Column 2

Checkbox Group

Available Options

* ☑ Customer *(checked)*
* ☐ Transport
* ☐ Supplier
* ☐ Delivery Challan

---

### Row 2

#### Column 1

Label

**Send Invoices Automatically Via WhatsApp**

Description

**Invoices will be automatically shared with customers via Swipe's WhatsApp number, including those uploaded in bulk.**

Additional Text

**Each message deducts 0.2 credits.**

Additional Text

**Credits vary for international numbers.**

#### Column 2

Toggle

Default

OFF

---

### Row 3

#### Column 1

Label

**Send Invoices Automatically Via Email**

Description

**Invoices will be automatically shared with customers via Swipe's Email.**

Additional Text

**Each message deducts 0.2 credits.**

#### Column 2

Toggle

Default

OFF

---

### Row 4

Primary Button

**Save Changes**

---

# Section 8 — Footer

Contains

* Swipe Logo
* **©2026 NextSpeed Technologies Private Limited. All rights reserved.**
* **Data is secured via 'bank-grade' security**

---

# 3. Buttons & Actions

| Button        | Type       | Position    | Alignment |
| ------------- | ---------- | ----------- | --------- |
| Go Premium 🚀 | Primary    | Top Banner  | Right     |
| Save Changes  | Primary    | Bottom Left | Left      |
| Back to Home  | Navigation | Sidebar     | Left      |

---

# 4. Tables

No data tables are present.

---

# 5. Navigation Elements

## Sidebar

### Profile

* Company Details
* User Profile
* All Users / Roles

### General Settings

* Preferences *(Active)*
* Thermal Print Settings
* Barcode Settings
* Signatures
* Notes & Terms 🔒
* Auto Reminders 🔒

### Banks and Payments

* Banks
* Swipe Wallet

### Integrations & Apps

* Swipe AI
* Payment Gateway 🔒
* Tally Integration 🔒
* API & Webhooks
* More

### Others

* Advanced Features

---

## Primary Tabs

* Document *(Active)*
* Products & Inventory
* Subscriptions
* POS
* Customise Links
* Notifications
* Email
* AI

---

## Secondary Tabs

* All
* **Sales**
* Purchases
* Conversions

---

## Header

* Swipe Logo
* MARUF DRESSES
* Change Company
* Ask SwipeAI
* Notification Icons
* User Profile

---

# 6. Cards, Panels & Components

## Components Present

* Sidebar Navigation
* Promotional Banner
* Section Headers
* Toggle Switches
* Checkbox Group
* Primary Buttons
* Footer
* Floating WhatsApp Button

## Components Not Present

* Tables
* Date Pickers
* Upload Fields
* Dropdowns
* Modals
* Alerts
* Accordions
* Chips
* Progress Bars
* Rich Text Editors

---

# 7. Layout Structure

```text
Full Width Layout

├── Sidebar
│      ├── Back to Home
│      ├── Profile
│      ├── General Settings
│      ├── Banks & Payments
│      ├── Integrations
│      └── Others
│
└── Main Content
       ├── Promotion Banner
       ├── Preferences
       ├── Main Tabs
       ├── Sales Tabs
       ├── Document Defaults
       ├── Configurations
       ├── Save Changes
       └── Footer
```

---

# 8. Complete Field Inventory

| Exact Label                              | Field Type | Section           | Row | Column |
| ---------------------------------------- | ---------- | ----------------- | --: | -----: |
| Negative Quantity                        | Toggle     | Document Defaults |   1 |      2 |
| Show Purchase Price                      | Toggle     | Document Defaults |   2 |      2 |
| Show Margin                              | Toggle     | Document Defaults |   3 |      2 |
| Warn for Low Selling Price (Web Only)    | Toggle     | Document Defaults |   4 |      2 |
| Mark as Fully Paid                       | Toggle     | Document Defaults |   5 |      2 |
| Use Recently Charged Price               | Toggle     | Document Defaults |   6 |      2 |
| Customer                                 | Checkbox   | Configurations    |   1 |      2 |
| Transport                                | Checkbox   | Configurations    |   1 |      2 |
| Supplier                                 | Checkbox   | Configurations    |   1 |      2 |
| Delivery Challan                         | Checkbox   | Configurations    |   1 |      2 |
| Send Invoices Automatically Via WhatsApp | Toggle     | Configurations    |   2 |      2 |
| Send Invoices Automatically Via Email    | Toggle     | Configurations    |   3 |      2 |

---

# 9. UI Observations

## Positive

* Consistent spacing and typography.
* All settings include explanatory helper text.
* Related settings are grouped logically.
* Sales preferences are isolated from other document categories using secondary tabs.
* Checkbox group clearly represents default invoice formats.
* Credit deduction information is prominently displayed before enabling automated messaging.

## Missing

* No confirmation message shown after saving.
* No reset-to-default button.
* No search/filter for settings.
* No tooltips explaining invoice type differences.
* No dependency indication between communication toggles and available messaging credits.

## Required Indicators

None visible.

## Default States

| Setting                                  | Default   |
| ---------------------------------------- | --------- |
| Negative Quantity                        | OFF       |
| Show Purchase Price                      | OFF       |
| Show Margin                              | OFF       |
| Warn for Low Selling Price (Web Only)    | OFF       |
| Mark as Fully Paid                       | OFF       |
| Use Recently Charged Price               | OFF       |
| Customer                                 | Checked   |
| Transport                                | Unchecked |
| Supplier                                 | Unchecked |
| Delivery Challan                         | Unchecked |
| Send Invoices Automatically Via WhatsApp | OFF       |
| Send Invoices Automatically Via Email    | OFF       |

---

# 10. Text Wireframe (ASCII Layout)

```text
────────────────────────────────────────────────────────────────────────────
Create unlimited E-way bills and E-invoices on mobile & web
                                                   [ Go Premium 🚀 ]
────────────────────────────────────────────────────────────────────────────

                              PREFERENCES

[Document] [Products & Inventory] [Subscriptions] [POS]
[Customise Links] [Notifications] [Email] [AI]

[All] [Sales] [Purchases] [Conversions]

────────────────────────────────────────────────────────────────────────────

DOCUMENT DEFAULTS

Negative Quantity                          [ OFF ]

Show Purchase Price                        [ OFF ]

Show Margin                                [ OFF ]

Warn for Low Selling Price (Web Only)      [ OFF ]

Mark as Fully Paid                         [ OFF ]

Use Recently Charged Price                 [ OFF ]

────────────────────────────────────────────────────────────────────────────

CONFIGURATIONS

Default Invoice Types

☑ Customer
☐ Transport
☐ Supplier
☐ Delivery Challan

────────────────────────────────────────────────────────────────────────────

Send Invoices Automatically Via WhatsApp

Invoices will be automatically shared with customers via Swipe's
WhatsApp number, including those uploaded in bulk.

Each message deducts 0.2 credits.
Credits vary for international numbers.

                                          [ OFF ]

────────────────────────────────────────────────────────────────────────────

Send Invoices Automatically Via Email

Invoices will be automatically shared with customers via Swipe's Email.

Each message deducts 0.2 credits.

                                          [ OFF ]

────────────────────────────────────────────────────────────────────────────

[ Save Changes ]

────────────────────────────────────────────────────────────────────────────

©2026 NextSpeed Technologies Private Limited.
Data is secured via 'bank-grade' security.
```

This analysis includes every visible heading, tab, section title, helper description, checkbox option, toggle, button, footer text, sidebar item, promotional text, and navigation element shown in the screenshot, without omitting any visible UI text or inferring hidden content.




# Complete UI Layout Breakdown

---

# 1. Page Overview

## Page Title

**Preferences**

---

## Purpose

This page manages **Purchase-specific Document Preferences**. It controls purchase document behavior, supplier invoice validation, purchase visibility settings, product update automation, and inventory synchronization during purchase creation, purchase orders, and stock updates.

---

## Total Sections / Cards / Forms

| Component                 |  Count |
| ------------------------- | -----: |
| Left Navigation Sidebar   |      1 |
| Promotional Banner        |      1 |
| Main Header               |      1 |
| Primary Preference Tabs   |      1 |
| Secondary Category Tabs   |      1 |
| Document Defaults Section |      1 |
| Product Update Section    |      1 |
| Action Button Area        |      1 |
| Footer                    |      1 |
| Floating WhatsApp Button  |      1 |
| **Total Major Sections**  | **10** |

---

# 2. Section-wise Analysis

---

# Section 1 — Left Navigation Sidebar

## Top Navigation

### Navigation Link

* **Back to Home**

---

## Profile

* Company Details
* User Profile
* All Users / Roles

---

## General Settings

* **Preferences** *(Selected)*
* Thermal Print Settings
* Barcode Settings
* Signatures
* Notes & Terms 🔒
* Auto Reminders 🔒

---

## Banks and Payments

* Banks
* Swipe Wallet

---

## Integrations & Apps

* Swipe AI
* Payment Gateway 🔒
* Tally Integration 🔒
* API & Webhooks
* More

---

## Others

* Advanced Features

---

# Section 2 — Promotional Banner

Rows: **1**

Columns: **2**

### Column 1

**Create unlimited E-way bills and E-invoices on mobile & web**

### Column 2

**Go Premium 🚀**

**Field Type:** Primary Button

---

# Section 3 — Page Header

Heading

**Preferences**

---

# Section 4 — Primary Preference Tabs

Rows: **1**

Columns: **8**

| Column | Tab                     |
| ------ | ----------------------- |
| 1      | **Document** *(Active)* |
| 2      | Products & Inventory    |
| 3      | Subscriptions           |
| 4      | POS                     |
| 5      | Customise Links         |
| 6      | Notifications           |
| 7      | Email                   |
| 8      | AI                      |

---

# Section 5 — Secondary Category Tabs

Rows: **1**

Columns: **4**

| Column | Tab                        |
| ------ | -------------------------- |
| 1      | All                        |
| 2      | Sales                      |
| 3      | **Purchases** *(Selected)* |
| 4      | Conversions                |

---

# Section 6 — Document Defaults

## Section Heading

**Document Defaults**

---

### Row 1 (2 Columns)

#### Column 1

**Label**

Supplier Invoice Number

**Description**

Make supplier invoice number mandatory while creating purchases.

#### Column 2

**Field Type**

Toggle Switch

**Default Value**

OFF

---

### Row 2 (2 Columns)

#### Column 1

**Label**

Show Selling Price

**Description**

Show selling prices of items only for admins while creating documents.

#### Column 2

**Field Type**

Toggle Switch

**Default Value**

OFF

---

### Row 3 (2 Columns)

#### Column 1

**Label**

Show Margin

**Description**

Show the margin details only for admins while creating documents.

#### Column 2

**Field Type**

Toggle Switch

**Default Value**

OFF

---

# Section 7 — Product Update

## Section Heading

**Product Update**

---

### Row 1 (2 Columns)

#### Column 1

**Label**

Update Product Details

**Description**

Choose which product fields should be updated automatically upon creating a purchase, purchase order, or stock update.

#### Column 2

**Field Type**

Dropdown (Multi-select)

**Placeholder**

**Select Fields to Update**

**Default Value**

None selected

---

### Row 2 (1 Column)

#### Column 1

Primary Button

**Save Changes**

---

# Section 8 — Footer

Contains

* Swipe Logo
* **©2026 NextSpeed Technologies Private Limited. All rights reserved.**
* **Data is secured via 'bank-grade' security**

---

# 3. Buttons & Actions

| Button        | Type       | Position           | Alignment |
| ------------- | ---------- | ------------------ | --------- |
| Go Premium 🚀 | Primary    | Promotional Banner | Right     |
| Save Changes  | Primary    | Bottom Left        | Left      |
| Back to Home  | Navigation | Sidebar            | Left      |

---

# 4. Tables

**No data tables are present on this page.**

---

# 5. Navigation Elements

## Sidebar Navigation

### Profile

* Company Details
* User Profile
* All Users / Roles

---

### General Settings

* Preferences *(Selected)*
* Thermal Print Settings
* Barcode Settings
* Signatures
* Notes & Terms 🔒
* Auto Reminders 🔒

---

### Banks and Payments

* Banks
* Swipe Wallet

---

### Integrations & Apps

* Swipe AI
* Payment Gateway 🔒
* Tally Integration 🔒
* API & Webhooks
* More

---

### Others

* Advanced Features

---

## Primary Tabs

* **Document**
* Products & Inventory
* Subscriptions
* POS
* Customise Links
* Notifications
* Email
* AI

---

## Secondary Tabs

* All
* Sales
* **Purchases**
* Conversions

---

## Header

* Swipe Logo
* MARUF DRESSES
* Change Company
* Search Bar (**How to add a payment QR code to the invoice?**)
* Keyboard Shortcut (**ctrl+k**)
* Lightning Icon
* Notification Bell
* Speaker Icon
* User Avatar

---

# 6. Cards, Panels & Components

## Present Components

* Sidebar Navigation
* Promotional Banner
* Page Header
* Primary Tab Navigation
* Secondary Tab Navigation
* Section Headers
* Toggle Switches
* Multi-select Dropdown
* Primary Action Button
* Footer
* Floating WhatsApp Button

---

## Not Present

* Tables
* Date Pickers
* Checkboxes
* Radio Buttons
* Upload Controls
* Accordions
* Modals
* Alerts
* Chips
* Progress Bars
* Rich Text Editors
* File Upload Areas

---

# 7. Layout Structure

```text
Full Width Layout

├── Left Sidebar
│     ├── Back to Home
│     ├── Profile
│     ├── General Settings
│     ├── Banks & Payments
│     ├── Integrations & Apps
│     └── Others
│
└── Main Content
      ├── Promotional Banner
      ├── Preferences
      ├── Primary Tabs
      ├── Purchases Tabs
      ├── Document Defaults
      ├── Product Update
      ├── Save Changes
      └── Footer
```

---

# 8. Complete Field Inventory

| Exact Label Text        | Field Type            | Section           | Row | Column |
| ----------------------- | --------------------- | ----------------- | --: | -----: |
| Supplier Invoice Number | Toggle Switch         | Document Defaults |   1 |      2 |
| Show Selling Price      | Toggle Switch         | Document Defaults |   2 |      2 |
| Show Margin             | Toggle Switch         | Document Defaults |   3 |      2 |
| Update Product Details  | Multi-select Dropdown | Product Update    |   1 |      2 |

---

# 9. UI Observations

## Positive

* Purchase preferences are clearly separated from Sales and Conversion preferences.
* Every setting includes explanatory helper text.
* Consistent two-column layout with labels on the left and controls on the right.
* Product update automation is grouped independently for better usability.
* Minimal, uncluttered interface with generous spacing.

---

## Missing

* No reset-to-default option.
* No success/error notification visible.
* No search/filter within settings.
* No tooltip explaining available fields in the **Select Fields to Update** dropdown.
* No preview of selected update fields.

---

## Required Indicators

No required (`*`) indicators are visible.

---

## Placeholder Text

| Field                  | Placeholder                 |
| ---------------------- | --------------------------- |
| Update Product Details | **Select Fields to Update** |

---

## Default Values Visible

| Field                   | Default Value |
| ----------------------- | ------------- |
| Supplier Invoice Number | OFF           |
| Show Selling Price      | OFF           |
| Show Margin             | OFF           |
| Update Product Details  | None selected |

---

# 10. Text Wireframe (ASCII Layout)

```text
────────────────────────────────────────────────────────────────────────────────────
Create unlimited E-way bills and E-invoices on mobile & web
                                                     [ Go Premium 🚀 ]
────────────────────────────────────────────────────────────────────────────────────

                                PREFERENCES

[Document] [Products & Inventory] [Subscriptions] [POS]
[Customise Links] [Notifications] [Email] [AI]

[All] [Sales] [Purchases] [Conversions]

────────────────────────────────────────────────────────────────────────────────────

DOCUMENT DEFAULTS

Supplier Invoice Number
Make supplier invoice number mandatory while creating purchases.
                                                [ OFF ]

────────────────────────────────────────────────────────────────────────────────────

Show Selling Price
Show selling prices of items only for admins while creating documents.
                                                [ OFF ]

────────────────────────────────────────────────────────────────────────────────────

Show Margin
Show the margin details only for admins while creating documents.
                                                [ OFF ]

────────────────────────────────────────────────────────────────────────────────────

PRODUCT UPDATE

Update Product Details

Choose which product fields should be updated automatically upon
creating a purchase, purchase order, or stock update.

┌────────────────────────────────────────────────────────────────────────────┐
│ Select Fields to Update                                             ▼      │
└────────────────────────────────────────────────────────────────────────────┘

────────────────────────────────────────────────────────────────────────────────────

[ Save Changes ]

────────────────────────────────────────────────────────────────────────────────────

©2026 NextSpeed Technologies Private Limited.
Data is secured via 'bank-grade' security.
```

## Complete Visible Text Inventory

### Promotional Banner

* Create unlimited E-way bills and E-invoices on mobile & web
* Go Premium 🚀

### Page Heading

* Preferences

### Primary Tabs

* Document
* Products & Inventory
* Subscriptions
* POS
* Customise Links
* Notifications
* Email
* AI

### Secondary Tabs

* All
* Sales
* Purchases
* Conversions

### Section Titles

* Document Defaults
* Product Update

### Field Labels

* Supplier Invoice Number
* Show Selling Price
* Show Margin
* Update Product Details

### Helper Text

* Make supplier invoice number mandatory while creating purchases.
* Show selling prices of items only for admins while creating documents.
* Show the margin details only for admins while creating documents.
* Choose which product fields should be updated automatically upon creating a purchase, purchase order, or stock update.

### Placeholder

* Select Fields to Update

### Buttons

* Save Changes
* Go Premium 🚀
* Back to Home

### Footer

* Swipe
* ©2026 NextSpeed Technologies Private Limited. All rights reserved.
* Data is secured via 'bank-grade' security

This analysis preserves every visible heading, label, helper description, tab, navigation item, placeholder, button, promotional text, footer text, and UI control shown in the screenshot, without inferring or omitting any visible content.



# Complete UI Layout Breakdown

---

# 1. Page Overview

## Page Title

**Preferences**

---

## Purpose

This page configures **Document Conversion Preferences**. It controls automatic quantity tracking between different business document conversion workflows (Sales Order → Invoice, Quotation → Invoice, Pro Forma → Invoice, Purchase Order → Purchase).

---

## Total Sections / Cards / Forms

| Component                        |  Count |
| -------------------------------- | -----: |
| Left Navigation Sidebar          |      1 |
| Top Header                       |      1 |
| Promotional Banner               |      1 |
| Main Preference Card             |      1 |
| Primary Preference Tabs          |      1 |
| Secondary Document Category Tabs |      1 |
| Quantity Tracking Section        |      1 |
| Action Button Area               |      1 |
| Footer                           |      1 |
| Floating WhatsApp Button         |      1 |
| **Total Major Sections**         | **10** |

---

# 2. Section-wise Analysis

---

# Section 1 — Left Navigation Sidebar

## Navigation Link

* **Back to Home**

---

## Profile

* Company Details
* User Profile
* All Users / Roles

---

## General Settings

* **Preferences** *(Selected)*
* Thermal Print Settings
* Barcode Settings
* Signatures
* Notes & Terms 🔒
* Auto Reminders 🔒

---

## Banks and Payments

* Banks
* Swipe Wallet

---

## Integrations & Apps

* Swipe AI
* Payment Gateway 🔒
* Tally Integration 🔒
* API & Webhooks
* More

---

## Others

* Advanced Features

---

# Section 2 — Top Header

### Left

* Swipe Logo
* **MARUF DRESSES**
* **Change Company**

---

### Center

Search Box

Placeholder

**How to remove Swipe branding from my invoice?**

Keyboard Shortcut

**ctrl+k**

---

### Right Header Icons

* Lightning
* Notification Bell
* Announcement/Speaker
* User Profile

---

# Section 3 — Promotional Banner

## Row 1 (2 Columns)

### Column 1

**Create unlimited E-way bills and E-invoices on mobile & web**

### Column 2

**Go Premium 🚀**

Button Type

Primary CTA Button

---

# Section 4 — Page Header

Heading

**Preferences**

---

# Section 5 — Primary Tabs

Rows: **1**

Columns: **8**

| Column | Tab                     |
| ------ | ----------------------- |
| 1      | **Document** *(Active)* |
| 2      | Products & Inventory    |
| 3      | Subscriptions           |
| 4      | POS                     |
| 5      | Customise Links         |
| 6      | Notifications           |
| 7      | Email                   |
| 8      | AI                      |

---

# Section 6 — Secondary Category Tabs

Rows: **1**

Columns: **4**

| Column | Tab                          |
| ------ | ---------------------------- |
| 1      | All                          |
| 2      | Sales                        |
| 3      | Purchases                    |
| 4      | **Conversions** *(Selected)* |

---

# Section 7 — Quantity Tracking

## Section Heading

**Quantity Tracking**

---

### Row 1 (2 Columns)

#### Column 1

**Sales order to Invoice**

Description

Enable tracking of quantities converted from sales order to invoice.

#### Column 2

Field Type

Toggle Switch

Default Value

**OFF**

---

### Row 2 (2 Columns)

#### Column 1

**Quotation to Invoice**

Description

Enable tracking of quantities converted from quotation to invoice.

#### Column 2

Field Type

Toggle Switch

Default Value

**ON**

---

### Row 3 (2 Columns)

#### Column 1

**Pro forma to Invoice**

Description

Enable tracking of quantities converted from pro forma to invoice.

#### Column 2

Field Type

Toggle Switch

Default Value

**OFF**

---

### Row 4 (2 Columns)

#### Column 1

**Purchase order to Purchase**

Description

Enable tracking of quantities converted from purchase order to purchase.

#### Column 2

Field Type

Toggle Switch

Default Value

**OFF**

---

### Row 5 (1 Column)

#### Column 1

Primary Button

**Save Changes**

---

# Section 8 — Footer

Contains

* Swipe Logo
* **©2026 NextSpeed Technologies Private Limited. All rights reserved.**
* **Data is secured via 'bank-grade' security**

---

# Section 9 — Floating Component

Floating Action Button

* WhatsApp

Position

Bottom Right

---

# 3. Buttons & Actions

| Button        | Type       | Position           | Alignment |
| ------------- | ---------- | ------------------ | --------- |
| Back to Home  | Navigation | Sidebar Top        | Left      |
| Go Premium 🚀 | Primary    | Promotional Banner | Right     |
| Save Changes  | Primary    | Bottom Left        | Left      |

---

# 4. Tables

No tables are visible.

| Property      | Status |
| ------------- | ------ |
| Table         | No     |
| Search        | No     |
| Filters       | No     |
| Sorting       | No     |
| Pagination    | No     |
| Bulk Actions  | No     |
| Row Selection | No     |
| Status Badges | No     |

---

# 5. Navigation Elements

## Sidebar

### Profile

* Company Details
* User Profile
* All Users / Roles

---

### General Settings

* Preferences
* Thermal Print Settings
* Barcode Settings
* Signatures
* Notes & Terms 🔒
* Auto Reminders 🔒

---

### Banks and Payments

* Banks
* Swipe Wallet

---

### Integrations & Apps

* Swipe AI
* Payment Gateway 🔒
* Tally Integration 🔒
* API & Webhooks
* More

---

### Others

* Advanced Features

---

## Primary Tabs

* Document
* Products & Inventory
* Subscriptions
* POS
* Customise Links
* Notifications
* Email
* AI

---

## Secondary Tabs

* All
* Sales
* Purchases
* **Conversions**

---

# 6. Cards, Panels & Components

Present Components

* Sidebar
* Promotional Banner
* Page Header
* Primary Tabs
* Secondary Tabs
* Quantity Tracking Section
* Toggle Switches
* Primary Button
* Footer
* Floating WhatsApp Button

---

Not Present

* Tables
* Accordions
* Cards with metrics
* Upload Controls
* Checkboxes
* Radio Buttons
* Date Pickers
* Alerts
* Tooltips
* Progress Bars
* Rich Text Editors
* File Upload Areas
* Modals

---

# 7. Layout Structure

```text
Full Width Layout

├── Left Sidebar
│     ├── Back to Home
│     ├── Profile
│     ├── General Settings
│     ├── Banks & Payments
│     ├── Integrations & Apps
│     └── Others
│
└── Main Content
      ├── Promotional Banner
      ├── Preferences
      ├── Primary Tabs
      ├── Secondary Tabs
      ├── Quantity Tracking
      ├── Save Changes
      └── Footer
```

Layout Characteristics

* Fixed left sidebar
* Centered content container
* Vertical single-column form
* Consistent spacing between preference rows
* Two-column row layout (Label + Toggle)
* Left-aligned labels
* Right-aligned switches
* Large whitespace for readability

---

# 8. Complete Field Inventory

| Exact Label Text           | Field Type    | Section           | Row | Column |
| -------------------------- | ------------- | ----------------- | --: | -----: |
| Sales order to Invoice     | Toggle Switch | Quantity Tracking |   1 |      2 |
| Quotation to Invoice       | Toggle Switch | Quantity Tracking |   2 |      2 |
| Pro forma to Invoice       | Toggle Switch | Quantity Tracking |   3 |      2 |
| Purchase order to Purchase | Toggle Switch | Quantity Tracking |   4 |      2 |

---

# 9. UI Observations

## Missing Labels

None. Every toggle has a visible label and descriptive helper text.

---

## Required Indicators

No required (`*`) indicators are shown.

---

## Placeholder Text

No input placeholders are present because the page contains only toggle controls.

---

## Default Values

| Setting                    | Default |
| -------------------------- | ------- |
| Sales order to Invoice     | OFF     |
| Quotation to Invoice       | ON      |
| Pro forma to Invoice       | OFF     |
| Purchase order to Purchase | OFF     |

---

## Disabled / Read-only Controls

None visible.

---

## Alignment

* Uniform left alignment for labels.
* Uniform right alignment for toggle switches.
* Consistent vertical spacing.
* Clear visual grouping under **Quantity Tracking**.

---

## UX Patterns

* Every preference includes explanatory helper text.
* Active toggle uses blue color.
* Inactive toggle uses gray color.
* Minimalistic settings interface with low visual clutter.
* Single save action at the end of the section.

---

# 10. Text Wireframe (ASCII Layout)

```text
────────────────────────────────────────────────────────────────────────────────────────────
Create unlimited E-way bills and E-invoices on mobile & web
                                                        [ Go Premium 🚀 ]
────────────────────────────────────────────────────────────────────────────────────────────

                               PREFERENCES

[Document] [Products & Inventory] [Subscriptions] [POS]
[Customise Links] [Notifications] [Email] [AI]

[All] [Sales] [Purchases] [Conversions]

────────────────────────────────────────────────────────────────────────────────────────────

QUANTITY TRACKING

Sales order to Invoice
Enable tracking of quantities converted from sales order to invoice.
                                                    [ OFF ]

────────────────────────────────────────────────────────────────────────────────────────────

Quotation to Invoice
Enable tracking of quantities converted from quotation to invoice.
                                                    [ ON ]

────────────────────────────────────────────────────────────────────────────────────────────

Pro forma to Invoice
Enable tracking of quantities converted from pro forma to invoice.
                                                    [ OFF ]

────────────────────────────────────────────────────────────────────────────────────────────

Purchase order to Purchase
Enable tracking of quantities converted from purchase order to purchase.
                                                    [ OFF ]

────────────────────────────────────────────────────────────────────────────────────────────

                        [ Save Changes ]

────────────────────────────────────────────────────────────────────────────────────────────

©2026 NextSpeed Technologies Private Limited.
Data is secured via 'bank-grade' security.
```

# Complete Visible Text Inventory

## Promotional Banner

* Create unlimited E-way bills and E-invoices on mobile & web
* Go Premium 🚀

---

## Header

* Swipe
* MARUF DRESSES
* Change Company
* How to remove Swipe branding from my invoice?
* ctrl+k

---

## Sidebar

### Navigation

* Back to Home

### Profile

* Company Details
* User Profile
* All Users / Roles

### General Settings

* Preferences
* Thermal Print Settings
* Barcode Settings
* Signatures
* Notes & Terms
* Auto Reminders

### Banks and Payments

* Banks
* Swipe Wallet

### Integrations & Apps

* Swipe AI
* Payment Gateway
* Tally Integration
* API & Webhooks
* More

### Others

* Advanced Features

---

## Main Heading

* Preferences

---

## Primary Tabs

* Document
* Products & Inventory
* Subscriptions
* POS
* Customise Links
* Notifications
* Email
* AI

---

## Secondary Tabs

* All
* Sales
* Purchases
* Conversions

---

## Section Heading

* Quantity Tracking

---

## Setting Labels

* Sales order to Invoice
* Quotation to Invoice
* Pro forma to Invoice
* Purchase order to Purchase

---

## Helper Text

* Enable tracking of quantities converted from sales order to invoice.
* Enable tracking of quantities converted from quotation to invoice.
* Enable tracking of quantities converted from pro forma to invoice.
* Enable tracking of quantities converted from purchase order to purchase.

---

## Buttons

* Save Changes
* Go Premium 🚀
* Back to Home

---

## Footer

* Swipe
* ©2026 NextSpeed Technologies Private Limited. All rights reserved.
* Data is secured via 'bank-grade' security.

This breakdown includes every visible heading, tab, navigation item, section title, label, helper description, button, promotional text, footer text, and control shown in the screenshot, without omitting any visible UI text or inferring hidden elements.




# Complete UI Layout Breakdown

---

# 1. Page Overview

## Page Title

**Preferences**

---

## Purpose

This page configures **Product Settings** under the **Products & Inventory** preference module. It defines default behavior for new products, including item type, pricing preference, maximum discount, default measurement unit, and default tax rate.

---

## Total Sections / Cards / Forms

| Component                |  Count |
| ------------------------ | -----: |
| Left Navigation Sidebar  |      1 |
| Top Header               |      1 |
| Promotional Banner       |      1 |
| Preferences Page         |      1 |
| Primary Navigation Tabs  |      1 |
| Secondary Product Tabs   |      1 |
| Product Settings Section |      1 |
| Action Button Area       |      1 |
| Footer                   |      1 |
| Floating WhatsApp Button |      1 |
| **Total Major Sections** | **10** |

---

# 2. Section-wise Analysis

---

# Section 1 — Left Navigation Sidebar

## Navigation

* **Back to Home**

---

## Profile

* Company Details
* User Profile
* All Users / Roles

---

## General Settings

* Preferences *(Selected)*
* Thermal Print Settings
* Barcode Settings
* Signatures
* Notes & Terms 🔒
* Auto Reminders 🔒

---

## Banks and Payments

* Banks
* Swipe Wallet

---

## Integrations & Apps

* Swipe AI
* Payment Gateway 🔒
* Tally Integration 🔒
* API & Webhooks
* More

---

## Others

* Advanced Features

---

# Section 2 — Top Header

### Left

* Swipe Logo
* MARUF DRESSES
* Change Company

---

### Center

Search Field

Placeholder

**How to remove Swipe branding from my invoice?**

Shortcut

**ctrl+k**

---

### Right

Icons

* Lightning
* Notification Bell
* Announcement
* User Profile

---

# Section 3 — Promotional Banner

## Row 1 (2 Columns)

### Column 1

**Create unlimited E-way bills and E-invoices on mobile & web**

### Column 2

**Go Premium 🚀**

Type

Primary CTA Button

---

# Section 4 — Page Header

Heading

**Preferences**

---

# Section 5 — Primary Navigation Tabs

Rows: **1**

Columns: **8**

| Column | Tab                                   |
| ------ | ------------------------------------- |
| 1      | Document                              |
| 2      | **Products & Inventory** *(Selected)* |
| 3      | Subscriptions                         |
| 4      | POS                                   |
| 5      | Customise Links                       |
| 6      | Notifications                         |
| 7      | Email                                 |
| 8      | AI                                    |

---

# Section 6 — Secondary Product Tabs

Rows: **1**

Columns: **3**

| Column | Tab                      |
| ------ | ------------------------ |
| 1      | **Product** *(Selected)* |
| 2      | Inventory                |
| 3      | Batch                    |

---

# Section 7 — Product Settings

## Section Heading

**Product Settings**

---

## Row 1 (2 Columns)

### Column 1

Label

**Default Item Type**

Description

The selected type will be set by default when adding a new item.

### Column 2

Field

Segmented Button (Radio Style)

Options

* **Product** *(Selected)*
* Service

Required

No

Default

Product

---

## Row 2 (2 Columns)

### Column 1

Label

**Default Price Preference**

Description

Choose how product prices are set by default — either inclusive (ON) or exclusive of tax (OFF).

### Column 2

Field

Toggle Switch

Default

ON

---

## Row 3 (2 Columns)

### Column 1

Label

**Max discount %**

Description

Maximum discount (%) allowed per item when creating invoices or adding/editing products (0–100).

### Column 2

Field Type

Number Input

Default Value

**100.0**

Required

No

Placeholder

None visible

---

## Row 4 (2 Columns)

### Column 1

Label

**Default Unit**

Description

The selected unit will be set by default when creating a new product.

### Column 2

Field Type

Dropdown

Placeholder

None visible

Default

Empty

Required

No

---

## Row 5 (2 Columns)

### Column 1

Label

**Default Tax Rate**

Description

The selected tax rate will be set by default when creating a new product.

### Column 2

Field Type

Dropdown

Visible Default

```
0
(0% CGST & 0% SGST, 0% IGST)
```

Required

No

---

## Row 6

### Column 1

Button

**Save Changes**

Primary Button

---

# Section 8 — Footer

Contains

* Swipe Logo
* **©2026 NextSpeed Technologies Private Limited. All rights reserved.**
* **Data is secured via 'bank-grade' security**

---

# Section 9 — Floating Component

Bottom Right

WhatsApp Floating Action Button

---

# 3. Buttons & Actions

| Button        | Type             | Position         | Alignment |
| ------------- | ---------------- | ---------------- | --------- |
| Back to Home  | Navigation       | Sidebar          | Left      |
| Go Premium 🚀 | Primary          | Banner           | Right     |
| Product       | Segmented Button | Product Settings | Right     |
| Service       | Segmented Button | Product Settings | Right     |
| Save Changes  | Primary          | Bottom Left      | Left      |

---

# 4. Tables

No tables are visible.

| Feature       | Status |
| ------------- | ------ |
| Table         | No     |
| Search        | No     |
| Filters       | No     |
| Sorting       | No     |
| Pagination    | No     |
| Bulk Actions  | No     |
| Row Selection | No     |
| Status Badges | No     |

---

# 5. Navigation Elements

## Sidebar

### Navigation

* Back to Home

### Profile

* Company Details
* User Profile
* All Users / Roles

### General Settings

* Preferences
* Thermal Print Settings
* Barcode Settings
* Signatures
* Notes & Terms
* Auto Reminders

### Banks and Payments

* Banks
* Swipe Wallet

### Integrations & Apps

* Swipe AI
* Payment Gateway
* Tally Integration
* API & Webhooks
* More

### Others

* Advanced Features

---

## Primary Tabs

* Document
* Products & Inventory
* Subscriptions
* POS
* Customise Links
* Notifications
* Email
* AI

---

## Secondary Tabs

* Product
* Inventory
* Batch

---

# 6. Cards, Panels & Components

Present Components

* Sidebar
* Header
* Promotional Banner
* Primary Navigation Tabs
* Secondary Tabs
* Settings Panel
* Toggle Switch
* Number Input
* Dropdown Lists
* Segmented Selector
* Primary Button
* Footer
* Floating WhatsApp Button

---

Not Present

* Tables
* Modals
* Accordions
* Rich Text Editor
* Upload Area
* Progress Bar
* Alerts
* Tooltips
* Date Picker
* Checkboxes
* Textarea

---

# 7. Layout Structure

```text
Full Width Layout

├── Left Sidebar
│     ├── Navigation
│     ├── Profile
│     ├── General Settings
│     ├── Banks & Payments
│     ├── Integrations & Apps
│     └── Others
│
└── Main Content
      ├── Promotional Banner
      ├── Preferences
      ├── Primary Tabs
      ├── Product Tabs
      ├── Product Settings
      ├── Save Changes
      └── Footer
```

Layout Characteristics

* Fixed sidebar
* Center content container
* Single-column settings form
* Two-column rows
* Left labels
* Right controls
* Uniform spacing
* Responsive white space

---

# 8. Complete Field Inventory

| Exact Label Text         | Field Type       | Section          | Row | Column |
| ------------------------ | ---------------- | ---------------- | --: | -----: |
| Default Item Type        | Segmented Button | Product Settings |   1 |      2 |
| Product                  | Segmented Button | Product Settings |   1 |      2 |
| Service                  | Segmented Button | Product Settings |   1 |      2 |
| Default Price Preference | Toggle Switch    | Product Settings |   2 |      2 |
| Max discount %           | Number Input     | Product Settings |   3 |      2 |
| Default Unit             | Dropdown         | Product Settings |   4 |      2 |
| Default Tax Rate         | Dropdown         | Product Settings |   5 |      2 |

---

# 9. UI Observations

## Missing Labels

None.

Every control has a corresponding label and helper description.

---

## Required Indicators

No required (`*`) indicators are shown.

---

## Placeholder Text

No placeholder text is visible inside the dropdown controls.

---

## Default Values

| Field                    | Value                          |
| ------------------------ | ------------------------------ |
| Default Item Type        | Product                        |
| Default Price Preference | ON                             |
| Max discount %           | 100.0                          |
| Default Unit             | Empty                          |
| Default Tax Rate         | 0 (0% CGST & 0% SGST, 0% IGST) |

---

## Disabled Controls

None visible.

---

## Read-only Fields

None visible.

---

## Alignment

* Consistent two-column settings layout.
* Uniform spacing.
* Helper text under each label.
* Controls aligned vertically on the right.
* Large whitespace improves readability.

---

## UX Patterns

* Product/Service uses a segmented selector instead of a dropdown.
* Numeric input constrained through helper text (0–100).
* Tax selection combines numeric value with descriptive tax breakdown.
* Toggle uses blue for enabled state.
* Save button placed after all settings.

---

# 10. Text Wireframe (ASCII Layout)

```text
────────────────────────────────────────────────────────────────────────────────────────────
Create unlimited E-way bills and E-invoices on mobile & web
                                                   [ Go Premium 🚀 ]
────────────────────────────────────────────────────────────────────────────────────────────

                               PREFERENCES

[Document]
[Products & Inventory]
[Subscriptions]
[POS]
[Customise Links]
[Notifications]
[Email]
[AI]

---------------------------------------------------------------

[Product] [Inventory] [Batch]

---------------------------------------------------------------

PRODUCT SETTINGS

Default Item Type
The selected type will be set by default when adding a new item.

                    [ Product ] [ Service ]

---------------------------------------------------------------

Default Price Preference
Choose how product prices are set by default.

                                [ ON ]

---------------------------------------------------------------

Max discount %
Maximum discount (%) allowed per item when creating invoices
or adding/editing products (0–100).

                    [ 100.0 ]

---------------------------------------------------------------

Default Unit
The selected unit will be set by default when creating a new product.

                    [ ▼ ]

---------------------------------------------------------------

Default Tax Rate
The selected tax rate will be set by default when creating a new product.

[ 0 ] [ ▼ (0% CGST & 0% SGST, 0% IGST) ]

---------------------------------------------------------------

[ Save Changes ]

────────────────────────────────────────────────────────────────────────────────────────────

Swipe

©2026 NextSpeed Technologies Private Limited. All rights reserved.

Data is secured via 'bank-grade' security.
```

# Complete Visible Text Inventory

## Promotional Banner

* Create unlimited E-way bills and E-invoices on mobile & web
* Go Premium 🚀

---

## Header

* Swipe
* MARUF DRESSES
* Change Company
* How to remove Swipe branding from my invoice?
* ctrl+k

---

## Sidebar

### Navigation

* Back to Home

### Profile

* Company Details
* User Profile
* All Users / Roles

### General Settings

* Preferences
* Thermal Print Settings
* Barcode Settings
* Signatures
* Notes & Terms
* Auto Reminders

### Banks and Payments

* Banks
* Swipe Wallet

### Integrations & Apps

* Swipe AI
* Payment Gateway
* Tally Integration
* API & Webhooks
* More

### Others

* Advanced Features

---

## Main Heading

* Preferences

---

## Primary Tabs

* Document
* Products & Inventory
* Subscriptions
* POS
* Customise Links
* Notifications
* Email
* AI

---

## Secondary Tabs

* Product
* Inventory
* Batch

---

## Section Heading

* Product Settings

---

## Field Labels

* Default Item Type
* Default Price Preference
* Max discount %
* Default Unit
* Default Tax Rate

---

## Helper Text

* The selected type will be set by default when adding a new item.
* Choose how product prices are set by default — either inclusive (ON) or exclusive of tax (OFF).
* Maximum discount (%) allowed per item when creating invoices or adding/editing products (0–100).
* The selected unit will be set by default when creating a new product.
* The selected tax rate will be set by default when creating a new product.

---

## Visible Values

* Product
* Service
* 100.0
* 0
* (0% CGST & 0% SGST, 0% IGST)

---

## Buttons

* Save Changes
* Go Premium 🚀
* Back to Home

---

## Footer

* Swipe
* ©2026 NextSpeed Technologies Private Limited. All rights reserved.
* Data is secured via 'bank-grade' security.

This analysis preserves every visible heading, tab, label, helper description, field, default value, button, navigation item, promotional message, footer text, and UI control shown in the screenshot without inferring any hidden or non-visible elements.



You uploaded **2 pages**. Below is the complete UI breakdown for **both**.

---

# PAGE 1 — Preferences → Products & Inventory → Product

# 1. Page Overview

### Page Title

**Preferences**

### Purpose

Configure default **Product Settings** used while creating new products and services, including default item type, pricing behavior, discount limits, default units, and tax rates.

### Total Sections / Cards / Forms

| Component                | Count |
| ------------------------ | ----: |
| Sidebar                  |     1 |
| Top Header               |     1 |
| Premium Banner           |     1 |
| Preferences Container    |     1 |
| Primary Tabs             |     1 |
| Secondary Tabs           |     1 |
| Product Settings Section |     1 |
| Footer                   |     1 |
| Floating WhatsApp Button |     1 |

---

# 2. Section-wise Analysis

---

## Section 1 — Product Settings

Section Heading

**Product Settings**

---

### Row 1 (2 Columns)

#### Column 1

Label

**Default Item Type**

Description

The selected type will be set by default when adding a new item.

#### Column 2

Field

Segmented Button

Options

* **Product** (Selected)
* Service

Field Type

Segmented Radio Button

Default

Product

---

### Row 2 (2 Columns)

#### Column 1

Label

**Default Price Preference**

Description

Choose how product prices are set by default — either inclusive (ON) or exclusive of tax (OFF).

#### Column 2

Field

Toggle Switch

State

ON

---

### Row 3 (2 Columns)

#### Column 1

Label

**Max discount %**

Description

Maximum discount (%) allowed per item when creating invoices or adding/editing products (0–100).

#### Column 2

Field

Number Input

Default Value

100.0

---

### Row 4 (2 Columns)

#### Column 1

Label

**Default Unit**

Description

The selected unit will be set by default when creating a new product.

#### Column 2

Field

Dropdown

Default

Empty

---

### Row 5 (2 Columns)

#### Column 1

Label

**Default Tax Rate**

Description

The selected tax rate will be set by default when creating a new product.

#### Column 2

Field

Dropdown

Visible Value

0

Visible Description

(0% CGST & 0% SGST, 0% IGST)

---

### Row 6

Button

**Save Changes**

Primary Button

---

# 3. Buttons & Actions

| Button        | Type       | Position    |
| ------------- | ---------- | ----------- |
| Product       | Segmented  | Right       |
| Service       | Segmented  | Right       |
| Save Changes  | Primary    | Bottom Left |
| Go Premium 🚀 | Primary    | Banner      |
| Back to Home  | Navigation | Sidebar     |

---

# 4. Tables

None

---

# 5. Navigation

## Main Tabs

* Document
* **Products & Inventory**
* Subscriptions
* POS
* Customise Links
* Notifications
* Email
* AI

---

## Secondary Tabs

* **Product**
* Inventory
* Batch

---

# 6. Components

Present

* Sidebar
* Header
* Banner
* Tabs
* Segmented Control
* Toggle
* Number Input
* Dropdown
* Footer
* Floating WhatsApp Button

---

# 7. Layout

```text
Banner
Heading

Main Tabs

Sub Tabs

Product Settings

Save Button

Footer
```

---

# 8. Complete Field Inventory

| Label                    | Type              |
| ------------------------ | ----------------- |
| Default Item Type        | Segmented Control |
| Default Price Preference | Toggle            |
| Max discount %           | Number Input      |
| Default Unit             | Dropdown          |
| Default Tax Rate         | Dropdown          |

---

# 9. UI Observations

* Excellent vertical spacing.
* Consistent two-column layout.
* Descriptive helper text.
* Product/Service selector provides faster interaction than dropdown.
* Tax dropdown combines value with tax breakdown.
* No validation hints visible.

---

# 10. ASCII Wireframe

```text
PREFERENCES

Products & Inventory

[Product] [Inventory] [Batch]

------------------------------------------------

PRODUCT SETTINGS

Default Item Type

            [Product] [Service]

------------------------------------------------

Default Price Preference

            [ ON ]

------------------------------------------------

Max discount %

            [100.0]

------------------------------------------------

Default Unit

            [▼]

------------------------------------------------

Default Tax Rate

[0] [▼ (0% CGST & 0% SGST, 0% IGST)]

------------------------------------------------

[ Save Changes ]
```

---

---

# PAGE 2 — Preferences → Products & Inventory → Batch

# 1. Page Overview

### Page Title

**Preferences**

### Purpose

Configure **Batch Settings** controlling manufacturing date format, expiry date format, and batch information display inside PDFs.

### Total Sections / Cards / Forms

| Component                | Count |
| ------------------------ | ----: |
| Sidebar                  |     1 |
| Header                   |     1 |
| Promotional Banner       |     1 |
| Preferences Page         |     1 |
| Primary Tabs             |     1 |
| Secondary Tabs           |     1 |
| Batch Settings Section   |     1 |
| Footer                   |     1 |
| Floating WhatsApp Button |     1 |

---

# 2. Section-wise Analysis

---

## Section — Batch Settings

Heading

**Batch Settings**

---

### Row 1 (2 Columns)

#### Column 1

Label

**Mfg./Expiry Date Format**

Description

Defines how Mfg. and Expiry dates appear in PDFs.

#### Column 2

Field

Dropdown

Visible Value

**DD-MM-YYYY**

Field Type

Dropdown

Required

No

---

### Row 2 (2 Columns)

#### Column 1

Label

**Show Batch Details**

Description

Displays batch details in separate PDF columns instead of under item names.

#### Column 2

Field

Toggle Switch

State

OFF

---

### Row 3

Button

**Save Changes**

Primary Button

---

# 3. Buttons & Actions

| Button           | Type       | Position    |
| ---------------- | ---------- | ----------- |
| Save Changes     | Primary    | Bottom Left |
| Subscribe Now 🚀 | Primary    | Banner      |
| Back to Home     | Navigation | Sidebar     |

---

# 4. Tables

None

---

# 5. Navigation

## Primary Tabs

* Document
* **Products & Inventory**
* Subscriptions
* POS
* Customise Links
* Notifications
* Email
* AI

---

## Secondary Tabs

* Product
* Inventory
* **Batch**

---

# 6. Cards & Components

Present

* Sidebar
* Header
* Banner
* Tabs
* Dropdown
* Toggle
* Footer
* Floating WhatsApp Button

Not Present

* Tables
* Upload Areas
* Date Picker
* Textarea
* Rich Text Editor
* Cards
* Accordion
* Alerts
* Chips
* Tooltips

---

# 7. Layout Structure

```text
Banner

Preferences

Main Tabs

Batch Tabs

Batch Settings

Save Changes

Footer
```

---

# 8. Complete Field Inventory

| Exact Label             | Type     | Section        | Row | Column |
| ----------------------- | -------- | -------------- | --: | -----: |
| Mfg./Expiry Date Format | Dropdown | Batch Settings |   1 |      2 |
| Show Batch Details      | Toggle   | Batch Settings |   2 |      2 |

---

# 9. UI Observations

### Missing Labels

None

### Required Indicators

None

### Placeholder

None

### Default Values

| Field                   | Value      |
| ----------------------- | ---------- |
| Mfg./Expiry Date Format | DD-MM-YYYY |
| Show Batch Details      | OFF        |

### Alignment

* Perfect alignment.
* Large whitespace.
* Consistent spacing.
* Helper text below labels.
* Right-aligned controls.

### UX

* Minimal configuration page.
* Easy to scan.
* Clear descriptions.
* Single save action reduces confusion.

---

# 10. ASCII Wireframe

```text
──────────────────────────────────────────────

PREFERENCES

Products & Inventory

[Product] [Inventory] [Batch]

──────────────────────────────────────────────

BATCH SETTINGS

Mfg./Expiry Date Format

            [DD-MM-YYYY ▼]

------------------------------------------------

Show Batch Details

            [OFF]

------------------------------------------------

[ Save Changes ]

──────────────────────────────────────────────

Footer
```

# Complete Visible Text Inventory (Batch Page)

## Banner

* Enjoy 15+ Templates, Remove Watermark & more
* Subscribe Now 🚀

## Heading

* Preferences

## Main Tabs

* Document
* Products & Inventory
* Subscriptions
* POS
* Customise Links
* Notifications
* Email
* AI

## Secondary Tabs

* Product
* Inventory
* Batch

## Section Heading

* Batch Settings

## Labels

* Mfg./Expiry Date Format
* Show Batch Details

## Helper Text

* Defines how Mfg. and Expiry dates appear in PDFs.
* Displays batch details in separate PDF columns instead of under item names.

## Visible Values

* DD-MM-YYYY

## Buttons

* Save Changes
* Subscribe Now 🚀
* Back to Home

## Footer

* Swipe
* ©2026 NextSpeed Technologies Private Limited. All rights reserved.
* Data is secured via 'bank-grade' security.

These analyses preserve all visible headings, labels, helper text, tab names, field values, buttons, navigation items, banner text, and footer text shown in the uploaded screenshots without inferring any hidden elements.


# PAGE ANALYSIS — Preferences → POS

---

# 1. Page Overview

### Page Title

**Preferences**

### Purpose

Configure all **Point of Sale (POS)** preferences including POS activation, receipt behavior, customer communication, permissions, discount handling, duplicate item behavior, banking defaults, and billing workflow.

### Total Sections / Cards / Forms

| Component                  | Count |
| -------------------------- | ----: |
| Left Sidebar Navigation    |     1 |
| Top Header                 |     1 |
| Promotional Banner         |     1 |
| Preferences Main Container |     1 |
| Primary Navigation Tabs    |     1 |
| POS Settings Form          |     1 |
| Configuration Groups       |     5 |
| Footer                     |     1 |
| Floating WhatsApp Button   |     1 |

---

# 2. Section-wise Analysis

---

# Section 1 — General Settings

Section Heading

**General Settings**

Contains POS activation and receipt display options.

---

## Row 1 (2 Columns)

### Column 1

**Activate POS**

Description

Enable this to display POS button on the sales dashboard.

### Column 2

Field Type

Toggle Switch

Visible State

**ON**

---

## Row 2 (2 Columns)

### Column 1

**Send SMS To Customer**

Description

Automatically send an SMS to customers when a POS bill is generated.

### Column 2

Field

Toggle

Visible State

OFF

---

## Row 3 (2 Columns)

### Column 1

**Show QR Code**

Description

Default value for 'Show QR Code?' toggle, while creating POS Bills.

### Column 2

Toggle

State

ON

---

## Row 4 (2 Columns)

### Column 1

**Show Cash Received**

Description

Enable this to show the cash received on POS thermal receipts.

### Column 2

Toggle

State

ON

---

## Row 5 (2 Columns)

### Column 1

**Show Brand Name**

Description

Enable this to show the brand name on POS bills.

### Column 2

Toggle

State

ON

---

## Row 6

Primary Button

**Save Changes**

(Located immediately below General Settings section.)

---

# Section 2 — Item Behaviour

*(Section heading is not visible due to scroll position, but the controls below are visible.)*

---

## Row 1 (2 Columns)

### Column 1

**Allow Decimal Quantity**

Description (partially visible)

By default, scanned items are set to quantity 1. Enable this to enter quantity manually.

### Column 2

Toggle

Visible State

OFF

---

## Row 2 (2 Columns)

### Column 1

**Allow Duplicate Items**

Description

When enabled, adding the same product again creates a new line item instead of increasing its quantity.

### Column 2

Toggle

Visible State

OFF

---

# Section 3 — Permissions

Section Heading

**Permissions**

---

## Row 1 (2 Columns)

### Column 1

**Allow Price Editing**

Description

Enable to edit item prices while billing. Disable to lock prices.

### Column 2

Toggle

Visible State

OFF

---

## Row 2 (2 Columns)

### Column 1

**Require Customer Name**

Description

Make customer name mandatory for completing POS transactions.

### Column 2

Toggle

Visible State

OFF

---

# Section 4 — Discount

Section Heading

**Discount**

---

## Row 1 (2 Columns)

### Column 1

**POS Discount**

Description

Allow applying discounts on POS bills. Disable to restrict discounting.

### Column 2

Toggle

Visible State

ON

---

# Section 5 — Bank

Section Heading

**Bank**

---

## Row 1 (2 Columns)

### Column 1

**Select Default Bank**

Description

Set a default bank for online payments.

### Column 2

Field Type

Dropdown

Visible Value

**IDFC First Bank Limited**

---

## Row 2

Primary Button

**Save Changes**

---

# 3. Buttons & Actions

| Button           | Type            | Position               | Alignment |
| ---------------- | --------------- | ---------------------- | --------- |
| Save Changes     | Primary         | Below General Settings | Left      |
| Save Changes     | Primary         | Bottom of Bank section | Left      |
| Subscribe Now 🚀 | Promotional CTA | Top Banner             | Center    |
| Back to Home     | Navigation      | Sidebar                | Left      |

---

# 4. Tables

No tables are present.

| Feature       | Present |
| ------------- | ------- |
| Table         | ❌       |
| Search        | ❌       |
| Filters       | ❌       |
| Pagination    | ❌       |
| Bulk Actions  | ❌       |
| Sorting       | ❌       |
| Row Selection | ❌       |
| Status Badges | ❌       |

---

# 5. Navigation Elements

## Header

* Swipe Logo
* Company Avatar (**MD**)
* **MARUF DRESSES**
* Change Company
* Ask SwipeAI Search Bar
* Keyboard Shortcut **ctrl+k**
* Lightning Icon
* Notification Bell
* Speaker/Announcement Icon
* User/Profile Icon

---

## Promotional Banner

**Enjoy 15+ Templates, Remove Watermark & more**

Button

**Subscribe Now 🚀**

---

## Sidebar

### Navigation

* Back to Home

### Profile

* Company Details
* User Profile
* All Users / Roles

### General Settings

* Preferences (**Selected**)
* Thermal Print Settings
* Barcode Settings
* Signatures
* Notes & Terms
* Auto Reminders

### Banks and Payments

* Banks
* Swipe Wallet

### Integrations & Apps

* Swipe AI
* Payment Gateway 🔒
* Tally Integration 🔒
* API & Webhooks
* More

### Others

* Advanced Features

---

## Primary Tabs

* Document
* Products & Inventory
* Subscriptions
* **POS** (Selected)
* Customise Links
* Notifications
* Email
* AI

---

# 6. Cards, Panels & Components

Present Components

* Sidebar
* Header
* Promotional Banner
* Settings Form
* Section Dividers
* Toggle Switches
* Dropdown
* Primary Buttons
* Footer
* Floating WhatsApp Button

Not Present

* Tables
* Accordions
* Modals
* Alerts
* Badges
* Chips
* Progress Bars
* File Upload Areas
* Rich Text Editors

---

# 7. Layout Structure

```
Top Header
────────────────────────────────────────────

Promotion Banner

────────────────────────────────────────────

Preferences

Primary Tabs

────────────────────────────────────────────

General Settings

5 Toggle Rows

Save Changes

────────────────────────────────────────────

Item Behaviour

2 Toggle Rows

────────────────────────────────────────────

Permissions

2 Toggle Rows

────────────────────────────────────────────

Discount

1 Toggle Row

────────────────────────────────────────────

Bank

Dropdown

Save Changes

────────────────────────────────────────────

Footer
```

Layout Characteristics

* Single-column settings page.
* Two-column alignment for every setting.
* Labels and helper text aligned left.
* Controls aligned right.
* Large vertical spacing.
* Horizontal section separators.
* Responsive scrolling form.

---

# 8. Complete Field Inventory

| Exact Label            | Field Type | Section          | Row | Column |
| ---------------------- | ---------- | ---------------- | --: | -----: |
| Activate POS           | Toggle     | General Settings |   1 |      2 |
| Send SMS To Customer   | Toggle     | General Settings |   2 |      2 |
| Show QR Code           | Toggle     | General Settings |   3 |      2 |
| Show Cash Received     | Toggle     | General Settings |   4 |      2 |
| Show Brand Name        | Toggle     | General Settings |   5 |      2 |
| Allow Decimal Quantity | Toggle     | Item Behaviour   |   1 |      2 |
| Allow Duplicate Items  | Toggle     | Item Behaviour   |   2 |      2 |
| Allow Price Editing    | Toggle     | Permissions      |   1 |      2 |
| Require Customer Name  | Toggle     | Permissions      |   2 |      2 |
| POS Discount           | Toggle     | Discount         |   1 |      2 |
| Select Default Bank    | Dropdown   | Bank             |   1 |      2 |

---

# 9. UI Observations

### Required Indicators

None visible.

### Placeholder Text

None.

### Default Values Visible

| Field                  | Value                   |
| ---------------------- | ----------------------- |
| Activate POS           | ON                      |
| Send SMS To Customer   | OFF                     |
| Show QR Code           | ON                      |
| Show Cash Received     | ON                      |
| Show Brand Name        | ON                      |
| Allow Decimal Quantity | OFF                     |
| Allow Duplicate Items  | OFF                     |
| Allow Price Editing    | OFF                     |
| Require Customer Name  | OFF                     |
| POS Discount           | ON                      |
| Select Default Bank    | IDFC First Bank Limited |

### Disabled Controls

None.

### Read-only Fields

None.

### Alignment

* Excellent alignment throughout.
* Consistent helper text placement.
* Equal spacing between setting groups.
* Controls vertically aligned.

### UX Patterns

* Every setting follows a consistent **Label → Description → Control** pattern.
* Logical grouping improves discoverability.
* Multiple **Save Changes** buttons reduce scrolling after edits.
* Section separators clearly distinguish configuration groups.
* Toggle switches provide quick enable/disable actions.

---

# 10. Text Wireframe (ASCII Layout)

```text
────────────────────────────────────────────────────────────────────────────

                             PREFERENCES

Document | Products & Inventory | Subscriptions | POS | Customise Links
Notifications | Email | AI

────────────────────────────────────────────────────────────────────────────

GENERAL SETTINGS

Activate POS
Enable this to display POS button on the sales dashboard.
                                               [ ON ]

------------------------------------------------------------

Send SMS To Customer
Automatically send an SMS to customers when a POS bill is generated.
                                               [ OFF ]

------------------------------------------------------------

Show QR Code
Default value for 'Show QR Code?' toggle, while creating POS Bills.
                                               [ ON ]

------------------------------------------------------------

Show Cash Received
Enable this to show the cash received on POS thermal receipts.
                                               [ ON ]

------------------------------------------------------------

Show Brand Name
Enable this to show the brand name on POS bills.
                                               [ ON ]

[ Save Changes ]

────────────────────────────────────────────────────────────────────────────

ITEM BEHAVIOUR

Allow Decimal Quantity                     [ OFF ]

Allow Duplicate Items                      [ OFF ]

────────────────────────────────────────────────────────────────────────────

PERMISSIONS

Allow Price Editing                        [ OFF ]

Require Customer Name                      [ OFF ]

────────────────────────────────────────────────────────────────────────────

DISCOUNT

POS Discount                               [ ON ]

────────────────────────────────────────────────────────────────────────────

BANK

Select Default Bank

[ IDFC First Bank Limited ▼ ]

[ Save Changes ]

────────────────────────────────────────────────────────────────────────────

Footer
```

## Complete Visible Text Inventory

### Page Heading

* Preferences

### Primary Tabs

* Document
* Products & Inventory
* Subscriptions
* POS
* Customise Links
* Notifications
* Email
* AI

### Section Headings

* General Settings
* Permissions
* Discount
* Bank

### Visible Labels

* Activate POS
* Send SMS To Customer
* Show QR Code
* Show Cash Received
* Show Brand Name
* Allow Decimal Quantity
* Allow Duplicate Items
* Allow Price Editing
* Require Customer Name
* POS Discount
* Select Default Bank

### Visible Helper Text

* Enable this to display POS button on the sales dashboard.
* Automatically send an SMS to customers when a POS bill is generated.
* Default value for 'Show QR Code?' toggle, while creating POS Bills.
* Enable this to show the cash received on POS thermal receipts.
* Enable this to show the brand name on POS bills.
* By default, scanned items are set to quantity 1. Enable this to enter quantity manually. *(partially visible)*
* When enabled, adding the same product again creates a new line item instead of increasing its quantity.
* Enable to edit item prices while billing. Disable to lock prices.
* Make customer name mandatory for completing POS transactions.
* Allow applying discounts on POS bills. Disable to restrict discounting.
* Set a default bank for online payments.

### Buttons

* Save Changes
* Subscribe Now 🚀
* Back to Home

### Footer

* Swipe
* ©2026 NextSpeed Technologies Private Limited. All rights reserved.
* Data is secured via 'bank-grade' security.

This breakdown includes every visible heading, label, helper text, navigation item, button, field, default value, and UI component visible in the provided screenshot, without inventing hidden or obscured elements.



# PAGE ANALYSIS — Preferences → Customise Links

---

# 1. Page Overview

### Page Title

**Preferences**

### Purpose

Configure the appearance and branding of customer-facing share links and landing pages by customizing cover images, background images, background colors, and logo shapes.

### Total Number of Sections / Cards / Forms

| Component                             |       Count |
| ------------------------------------- | ----------: |
| Left Sidebar Navigation               |           1 |
| Top Header                            |           1 |
| Promotional Banner                    |           1 |
| Main Preferences Container            |           1 |
| Primary Navigation Tabs               |           1 |
| Customise Links Configuration Section |           1 |
| Footer (partially outside viewport)   | Not Visible |
| Floating WhatsApp Button              |           1 |

---

# 2. Section-wise Analysis

## Main Section

### Section Heading

**Preferences**

No additional description is displayed.

---

## Primary Navigation Tabs

* Document
* Products & Inventory
* Subscriptions
* POS
* **Customise Links** *(Selected)*
* Notifications
* Email
* AI

---

## Configuration Area

---

### Row 1 (2 Columns)

#### Column 1

**Cover Image**

Description

**4:1 aspect ratio**

#### Column 2

##### Component 1

**Upload**

Field Type

Image Upload Area

Icon

*

Placeholder

Upload

---

##### Component 2

Image Preview

Field Type

Selectable Image Card

Visible State

Selected (Blue Border)

---

### Row 2 (2 Columns)

#### Column 1

**Background Image**

Description

**16:9 aspect ratio**

#### Column 2

Contains **five selectable image components**

##### Component 1

Upload Area

Type

Image Upload

Text

Upload

Icon

*

---

##### Component 2

Pattern Thumbnail

Black Dot Pattern

Selectable Image Card

---

##### Component 3

Pattern Thumbnail

Diagonal Grey Pattern

Selectable Image Card

---

##### Component 4

Pattern Thumbnail

Multicolour Pattern

Selectable Image Card

---

##### Component 5

Blank White Thumbnail

Selectable Image Card

---

### Row 3 (2 Columns)

#### Column 1

**Background Color**

#### Column 2

Button

**Custom color**

Type

Primary Button

---

### Row 4 (2 Columns)

#### Column 1

**Logo Shape**

#### Column 2

Two selectable logo style options

##### Option 1

Circular Logo

State

Selected

Blue Border

##### Option 2

Square Logo

State

Unselected

Grey Border

---

# 3. Buttons & Actions

| Button           | Type            | Position         | Alignment |
| ---------------- | --------------- | ---------------- | --------- |
| Upload           | Upload Button   | Cover Image      | Right     |
| Upload           | Upload Button   | Background Image | Right     |
| Custom color     | Primary Button  | Background Color | Right     |
| Subscribe Now 🚀 | Promotional CTA | Top Banner       | Center    |
| Back to Home     | Navigation      | Sidebar          | Left      |

### Clickable Image Actions

* Cover Image Preview
* Background Pattern 1
* Background Pattern 2
* Background Pattern 3
* Background Pattern 4
* Logo Shape (Circle)
* Logo Shape (Square)

---

# 4. Tables

No tables are present.

| Feature       | Status |
| ------------- | ------ |
| Table         | ❌      |
| Search        | ❌      |
| Filters       | ❌      |
| Pagination    | ❌      |
| Bulk Actions  | ❌      |
| Sorting       | ❌      |
| Row Selection | ❌      |
| Status Badges | ❌      |

---

# 5. Navigation Elements

## Header

* Swipe Logo
* Company Avatar (**MD**)
* **MARUF DRESSES**
* Change Company
* Ask SwipeAI Search Box
* ctrl+k
* Lightning Icon
* Notification Bell
* Announcement Icon
* User Icon

---

## Promotional Banner

Text

**Enjoy 15+ Templates, Remove Watermark & more**

CTA

**Subscribe Now 🚀**

---

## Sidebar Navigation

### Navigation

* Back to Home

### Profile

* Company Details
* User Profile
* All Users / Roles

### General Settings

* Preferences *(Selected)*
* Thermal Print Settings
* Barcode Settings
* Signatures
* Notes & Terms
* Auto Reminders

### Banks and Payments

* Banks
* Swipe Wallet

### Integrations & Apps

* Swipe AI
* Payment Gateway 🔒
* Tally Integration 🔒
* API & Webhooks
* More

### Others

* Advanced Features

---

## Page Tabs

* Document
* Products & Inventory
* Subscriptions
* POS
* **Customise Links**
* Notifications
* Email
* AI

---

# 6. Cards, Panels & Components

Present

* Sidebar
* Header
* Promotional Banner
* Tab Navigation
* Image Upload Areas
* Image Preview Card
* Image Selection Cards
* Pattern Selection Cards
* Primary Button
* Circular Selection Control
* Square Selection Control
* Floating WhatsApp Button

Not Present

* Tables
* Accordion
* Modal
* Alerts
* Rich Text Editor
* Progress Bar
* Text Inputs
* Dropdown
* Checkbox
* Radio Button
* Date Picker

---

# 7. Layout Structure

```
Top Header

Promotion Banner

Preferences

Navigation Tabs

────────────────────────────

Cover Image

Upload | Selected Preview

────────────────────────────

Background Image

Upload | Pattern 1 | Pattern 2 | Pattern 3 | Pattern 4

────────────────────────────

Background Color

Custom color Button

────────────────────────────

Logo Shape

Circle Option | Square Option

────────────────────────────
```

### Layout Characteristics

* Single-column page.
* Labels aligned left.
* Controls aligned right.
* Upload cards use fixed square containers.
* Equal spacing between configuration groups.
* Horizontal layout for image selections.
* Responsive grid for image thumbnails.

---

# 8. Complete Field Inventory

| Exact Label          | Field Type       | Section          | Row | Column |
| -------------------- | ---------------- | ---------------- | --: | -----: |
| Cover Image          | Image Upload     | Cover Image      |   1 |      2 |
| Cover Image Preview  | Image Selector   | Cover Image      |   1 |      2 |
| Background Image     | Image Upload     | Background Image |   2 |      2 |
| Background Pattern 1 | Image Selector   | Background Image |   2 |      2 |
| Background Pattern 2 | Image Selector   | Background Image |   2 |      2 |
| Background Pattern 3 | Image Selector   | Background Image |   2 |      2 |
| Background Pattern 4 | Image Selector   | Background Image |   2 |      2 |
| Background Color     | Primary Button   | Background Color |   3 |      2 |
| Logo Shape (Circle)  | Selection Button | Logo Shape       |   4 |      2 |
| Logo Shape (Square)  | Selection Button | Logo Shape       |   4 |      2 |

---

# 9. UI Observations

## Required Indicators

None visible.

## Placeholder Text

* Upload

## Default Values

### Cover Image

* Existing image preview selected.

### Background Image

* No explicit selected pattern visible.

### Background Color

* Custom color button available.

### Logo Shape

* Circle selected.
* Square unselected.

## Disabled Controls

None visible.

## Read-only Controls

None.

## Alignment

* Excellent alignment throughout.
* Consistent spacing between rows.
* Image thumbnails aligned uniformly.
* Labels positioned consistently on left.
* Controls positioned consistently on right.

## UI/UX Patterns

* Uses visual selection instead of dropdowns.
* Thumbnail previews improve discoverability.
* Aspect ratio hints shown below image labels.
* Primary branding options grouped logically.
* Strong visual feedback through blue selection borders.

---

# 10. Text Wireframe (ASCII Layout)

```text
────────────────────────────────────────────────────────────────────────────

                              PREFERENCES

Document | Products & Inventory | Subscriptions | POS |
Customise Links | Notifications | Email | AI

────────────────────────────────────────────────────────────────────────────

Cover Image
4:1 aspect ratio

[ + Upload ]      [ Selected Cover Preview ]

────────────────────────────────────────────────────────────────────────────

Background Image
16:9 aspect ratio

[ + Upload ] [ Pattern 1 ] [ Pattern 2 ] [ Pattern 3 ] [ Pattern 4 ]

────────────────────────────────────────────────────────────────────────────

Background Color

                [ Custom color ]

────────────────────────────────────────────────────────────────────────────

Logo Shape

           (◉ Circle)      [ Square ]

────────────────────────────────────────────────────────────────────────────
```

# Complete Visible Text Inventory

## Banner

* Enjoy 15+ Templates, Remove Watermark & more
* Subscribe Now 🚀

## Page Heading

* Preferences

## Primary Tabs

* Document
* Products & Inventory
* Subscriptions
* POS
* Customise Links
* Notifications
* Email
* AI

## Configuration Labels

* Cover Image
* 4:1 aspect ratio
* Background Image
* 16:9 aspect ratio
* Background Color
* Logo Shape

## Buttons

* Upload
* Upload
* Custom color
* Subscribe Now 🚀
* Back to Home

## Sidebar Items

### Profile

* Company Details
* User Profile
* All Users / Roles

### General Settings

* Preferences
* Thermal Print Settings
* Barcode Settings
* Signatures
* Notes & Terms
* Auto Reminders

### Banks and Payments

* Banks
* Swipe Wallet

### Integrations & Apps

* Swipe AI
* Payment Gateway
* Tally Integration
* API & Webhooks
* More

### Others

* Advanced Features

This analysis preserves all visible headings, labels, helper text, navigation items, buttons, image upload areas, selectable thumbnails, logo shape controls, and other UI elements exactly as shown, without inferring any hidden or non-visible controls.




# UI Analysis — Preferences → Notifications

---

# 1. Page Overview

### Page Title

**Preferences**

### Purpose of the Page

This page allows users to configure **Notification Preferences** for the Swipe application. Users can enable or disable different categories of notifications including promotional updates, operational alerts, and transactional notifications.

### Total Number of Sections / Cards / Forms

| Component                             | Count |
| ------------------------------------- | ----: |
| Left Sidebar Navigation               |     1 |
| Top Application Header                |     1 |
| Promotional Banner                    |     1 |
| Main Preferences Card                 |     1 |
| Primary Preference Navigation Tabs    |     1 |
| Notification Preferences Form Section |     1 |
| Footer                                |     1 |
| Floating WhatsApp Button              |     1 |

---

# 2. Section-wise Analysis

---

## Main Page Header

### Heading

**Preferences**

No page description is displayed.

---

## Primary Navigation Tabs

Located directly below the page title.

| Tab                  | State      |
| -------------------- | ---------- |
| Document             | Inactive   |
| Products & Inventory | Inactive   |
| Subscriptions        | Inactive   |
| POS                  | Inactive   |
| Customise Links      | Inactive   |
| **Notifications**    | **Active** |
| Email                | Inactive   |
| AI                   | Inactive   |

---

# Section: Notification Preferences

### Section Heading

**Notification Preferences**

No section description.

---

## Row 1 (2 Columns)

### Column 1

**Promotional**

Description

> Get notified about new features, updates and offers from Swipe.

### Column 2

Field Type

**Toggle Switch**

Default Value

**ON**

Required Indicator

None

Placeholder

None

---

## Row 2 (2 Columns)

### Column 1

**Alerts**

Description

> Receive notifications for products with low stock levels, pending invoices, and batches nearing expiration, etc.

### Column 2

Field Type

**Toggle Switch**

Default Value

**ON**

Required Indicator

None

Placeholder

None

---

## Row 3 (2 Columns)

### Column 1

**Transactional**

Description

> in-app notifications to alert users about received payments, created documents, new user logins, and other app activities.

### Column 2

Field Type

**Toggle Switch**

Default Value

**ON**

Required Indicator

None

Placeholder

None

---

## Row 4 (Single Column)

### Left

**Save Changes**

Field Type

Primary Button

Position

Bottom-left of the form

---

# 3. Buttons & Actions

| Button / Action          | Type                   | Position                                | Alignment |
| ------------------------ | ---------------------- | --------------------------------------- | --------- |
| Save Changes             | Primary Button         | Bottom-left of Notification Preferences | Left      |
| Subscribe Now 🚀         | Promotional CTA        | Promotional Banner                      | Center    |
| Back to Home             | Navigation             | Sidebar Top                             | Left      |
| Promotional Toggle       | Toggle Switch          | Right of Promotional                    | Right     |
| Alerts Toggle            | Toggle Switch          | Right of Alerts                         | Right     |
| Transactional Toggle     | Toggle Switch          | Right of Transactional                  | Right     |
| WhatsApp Floating Button | Floating Action Button | Bottom-right                            | Floating  |

---

# 4. Tables

No tables are present.

| Feature       | Available |
| ------------- | --------- |
| Table         | ❌         |
| Search        | ❌         |
| Filters       | ❌         |
| Pagination    | ❌         |
| Bulk Actions  | ❌         |
| Sorting       | ❌         |
| Row Selection | ❌         |
| Status Badges | ❌         |

---

# 5. Navigation Elements

---

## Header

Visible items:

* Swipe Logo
* Company Avatar (**MD**)
* **MARUF DRESSES**
* Change Company
* Ask SwipeAI Search Box
* Keyboard Shortcut (**ctrl+k**)
* Lightning Icon
* Notification Bell
* Announcement Icon
* User Profile Icon

---

## Promotional Banner

Visible Text

> Enjoy 15+ Templates, Remove Watermark & more

CTA

> Subscribe Now 🚀

---

## Sidebar Navigation

### Navigation

* Back to Home

### Profile

* Company Details
* User Profile
* All Users / Roles

### General Settings

* Preferences *(Selected)*
* Thermal Print Settings
* Barcode Settings
* Signatures
* Notes & Terms
* Auto Reminders

### Banks and Payments

* Banks
* Swipe Wallet

### Integrations & Apps

* Swipe AI
* Payment Gateway 🔒
* Tally Integration 🔒
* API & Webhooks
* More

### Others

* Advanced Features

---

## Page-Level Tabs

* Document
* Products & Inventory
* Subscriptions
* POS
* Customise Links
* **Notifications** *(Selected)*
* Email
* AI

---

# 6. Cards, Panels & Components

### Present Components

* Main Card Container
* Sidebar
* Header
* Promotional Banner
* Horizontal Navigation Tabs
* Section Heading
* Toggle Switches
* Primary Button
* Floating WhatsApp Button

### Not Present

* Tables
* Accordions
* Modals
* Alerts
* Badges
* Chips
* Tooltips
* Progress Bars
* File Upload Areas
* Rich Text Editors
* Text Inputs
* Dropdowns
* Date Pickers
* Checkboxes
* Radio Buttons

---

# 7. Layout Structure

### Overall Layout

```
Top Header

Promotional Banner

Preferences Title

Primary Tabs

Notification Preferences

Promotional ---------- Toggle

Alerts --------------- Toggle

Transactional -------- Toggle

Save Changes Button

Footer
```

### Layout Characteristics

* Single-column form layout.
* Two-column row structure:

  * Left: Label + helper text.
  * Right: Toggle switch.
* Consistent vertical spacing.
* Controls aligned to the right.
* Large whitespace on the right side.
* Responsive card centered within the page.

---

# 8. Complete Field Inventory

| Exact Label   | Field Type    | Section                  | Row | Column |
| ------------- | ------------- | ------------------------ | --: | -----: |
| Promotional   | Toggle Switch | Notification Preferences |   1 |      2 |
| Alerts        | Toggle Switch | Notification Preferences |   2 |      2 |
| Transactional | Toggle Switch | Notification Preferences |   3 |      2 |

---

# 9. UI Observations

## Required Indicators

* None visible.

## Placeholder Text

* None.

## Default Values

| Field         | Default |
| ------------- | ------- |
| Promotional   | ON      |
| Alerts        | ON      |
| Transactional | ON      |

## Disabled Controls

* None visible.

## Read-only Fields

* None.

## Alignment

* Excellent left-right alignment.
* Consistent spacing between rows.
* Uniform placement of toggles.
* Navigation tabs evenly distributed.

## Duplicate Fields

* None.

## Missing Labels

* None.

## UI/UX Patterns

* Uses concise helper text beneath each preference.
* Right-aligned toggles make scanning easy.
* Blue active-state toggles provide strong visual feedback.
* Minimalist settings page with ample whitespace.
* Logical grouping under a single notification category.

---

# 10. Text Wireframe (ASCII Layout)

```text
────────────────────────────────────────────────────────────────────────────

                              PREFERENCES

Document | Products & Inventory | Subscriptions | POS |
Customise Links | Notifications | Email | AI

────────────────────────────────────────────────────────────────────────────

SECTION: Notification Preferences

Promotional
Get notified about new features, updates and offers from Swipe.
                                               [ ON ]

────────────────────────────────────────────────────────────────────────────

Alerts
Receive notifications for products with low stock levels,
pending invoices, and batches nearing expiration, etc.
                                               [ ON ]

────────────────────────────────────────────────────────────────────────────

Transactional
in-app notifications to alert users about received payments,
created documents, new user logins, and other app activities.
                                               [ ON ]

────────────────────────────────────────────────────────────────────────────

[ Save Changes ]

────────────────────────────────────────────────────────────────────────────
```

# Complete Visible Text Inventory

## Promotional Banner

* Enjoy 15+ Templates, Remove Watermark & more
* Subscribe Now 🚀

## Page Heading

* Preferences

## Primary Tabs

* Document
* Products & Inventory
* Subscriptions
* POS
* Customise Links
* Notifications
* Email
* AI

## Section Heading

* Notification Preferences

## Field Labels

* Promotional
* Alerts
* Transactional

## Helper Text

* Get notified about new features, updates and offers from Swipe.
* Receive notifications for products with low stock levels, pending invoices, and batches nearing expiration, etc.
* in-app notifications to alert users about received payments, created documents, new user logins, and other app activities.

## Buttons

* Save Changes
* Subscribe Now 🚀
* Back to Home

## Sidebar Items

### Profile

* Company Details
* User Profile
* All Users / Roles

### General Settings

* Preferences
* Thermal Print Settings
* Barcode Settings
* Signatures
* Notes & Terms
* Auto Reminders

### Banks and Payments

* Banks
* Swipe Wallet

### Integrations & Apps

* Swipe AI
* Payment Gateway
* Tally Integration
* API & Webhooks
* More

### Others

* Advanced Features

This breakdown preserves all visible headings, labels, helper text, buttons, navigation items, tab names, toggle controls, promotional text, and page structure exactly as shown in the uploaded image, without inferring any hidden or non-visible UI elements.



# UI Analysis — Preferences → Email

---

# 1. Page Overview

### Page Title

**Preferences**

### Purpose of the Page

This page allows users to configure **Email Preferences** for outgoing emails generated by the application. It provides options for sender identity, sender preview, CC/BCC recipients, and access to email templates.

### Total Number of Sections / Cards / Forms

| Component                 | Count |
| ------------------------- | ----: |
| Left Sidebar Navigation   |     1 |
| Top Application Header    |     1 |
| Promotional Banner        |     1 |
| Main Preferences Card     |     1 |
| Primary Navigation Tabs   |     1 |
| Email Preferences Section |     1 |
| Footer                    |     1 |
| Floating WhatsApp Button  |     1 |

---

# 2. Section-wise Analysis

---

# Main Page Header

### Heading

**Preferences**

No page description is displayed.

---

# Primary Navigation Tabs

Located beneath the page title.

| Tab                  | Status     |
| -------------------- | ---------- |
| Document             | Inactive   |
| Products & Inventory | Inactive   |
| Subscriptions        | Inactive   |
| POS                  | Inactive   |
| Customise Links      | Inactive   |
| Notifications        | Inactive   |
| **Email**            | **Active** |
| AI                   | Inactive   |

---

# Section: Email Preferences

### Section Heading

**Email Preferences**

No additional section description.

---

## Row 1 (Single Column)

### Column 1

**Email Templates**

Field Type

Button (Outline / Secondary)

Icon

➕ (plus icon)

Purpose

Open/manage email templates.

---

## Row 2 (2 Columns)

### Column 1

Label

**Sender Name**

Description

> This will appear in the sender name and email subject.

### Column 2

Field

Dropdown

Default Value

**Company Name**

Placeholder

None

Required Indicator

None

---

## Row 3 (2 Columns)

### Column 1

Label

**Sender Name Preview**

No helper description.

### Column 2

Field Type

Read-only Textbox

Default Value

**MARUF DRESSES**

State

Disabled / Read-only

---

## Row 4 (2 Columns)

### Column 1

Label

**Custom Sender Email**

No helper description.

### Column 2

Field Type

Read-only Textbox

Default Value

**[noreply@swipebilling.com](mailto:noreply@swipebilling.com)**

State

Disabled / Read-only

---

## Row 5 (2 Columns)

### Column 1

Label

**CC Emails**

Description

> Emails that will be CC'd in all outgoing emails. By default, company email will be included.

### Column 2

Field Type

Dropdown / Multi-select

Placeholder

**CC Emails**

Default Value

None visible

Required Indicator

None

---

## Row 6 (2 Columns)

### Column 1

Label

**BCC Emails**

Description

> Emails that will be BCC'd in all outgoing emails.

### Column 2

Field Type

Dropdown / Multi-select

Placeholder

**BCC Emails**

Default Value

None visible

Required Indicator

None

---

## Row 7 (Single Column)

### Column 1

**Save Changes**

Field Type

Primary Button

Alignment

Left

---

# 3. Buttons & Actions

| Button / Action          | Type                       | Position                 | Alignment |
| ------------------------ | -------------------------- | ------------------------ | --------- |
| Email Templates          | Secondary / Outline Button | Top of Email Preferences | Left      |
| Save Changes             | Primary Button             | Bottom of Form           | Left      |
| Upgrade Now 🚀           | Promotional CTA            | Banner                   | Center    |
| Back to Home             | Navigation                 | Sidebar Top              | Left      |
| WhatsApp Floating Button | Floating Action Button     | Bottom-right             | Floating  |

---

# 4. Tables

No tables are present.

| Feature       | Available |
| ------------- | --------- |
| Table         | ❌         |
| Search        | ❌         |
| Filters       | ❌         |
| Pagination    | ❌         |
| Sorting       | ❌         |
| Bulk Actions  | ❌         |
| Row Selection | ❌         |
| Status Badges | ❌         |

---

# 5. Navigation Elements

---

## Header

Visible items

* Swipe Logo
* Company Avatar (**MD**)
* **MARUF DRESSES**
* Change Company
* Ask SwipeAI Search Box
* ctrl+k shortcut
* Lightning Icon
* Notification Bell
* Announcement Icon
* User Profile Icon

---

## Promotional Banner

Visible Text

> Bulk Edit, Download, Merge & Convert Your Docs

CTA

> Upgrade Now 🚀

---

## Sidebar Navigation

### Profile

* Company Details
* User Profile
* All Users / Roles

### General Settings

* Preferences *(Selected)*
* Thermal Print Settings
* Barcode Settings
* Signatures
* Notes & Terms
* Auto Reminders

### Banks and Payments

* Banks
* Swipe Wallet

### Integrations & Apps

* Swipe AI
* Payment Gateway 🔒
* Tally Integration 🔒
* API & Webhooks
* More

### Others

* Advanced Features

---

## Page Tabs

* Document
* Products & Inventory
* Subscriptions
* POS
* Customise Links
* Notifications
* **Email**
* AI

---

# 6. Cards, Panels & Components

## Present Components

* Main Card
* Sidebar
* Header
* Promotional Banner
* Horizontal Navigation Tabs
* Secondary Button
* Primary Button
* Dropdown
* Read-only Textboxes
* Multi-select Dropdowns
* Floating WhatsApp Button

## Not Present

* Tables
* Accordions
* Modals
* Alerts
* Progress Bars
* Rich Text Editors
* Upload Controls
* Checkboxes
* Radio Buttons
* Toggle Switches
* Date Pickers

---

# 7. Layout Structure

## Overall Layout

```text
Header

Promotional Banner

Preferences

Navigation Tabs

────────────────────────────────────────────

Email Preferences

[ Email Templates ]

Sender Name --------------------- [ Company Name ▼ ]

Sender Name Preview ------------- [ MARUF DRESSES ]

Custom Sender Email ------------- [ noreply@swipebilling.com ]

CC Emails ----------------------- [ CC Emails ▼ ]

BCC Emails ---------------------- [ BCC Emails ▼ ]

[ Save Changes ]

Footer
```

### Layout Characteristics

* Single-column settings page.
* Two-column field arrangement:

  * Left: Labels and descriptions.
  * Right: Input controls.
* Consistent vertical spacing.
* Large whitespace on the right.
* Left-aligned action buttons.

---

# 8. Complete Field Inventory

| Exact Label         | Field Type              | Section           | Row | Column |
| ------------------- | ----------------------- | ----------------- | --: | -----: |
| Sender Name         | Dropdown                | Email Preferences |   2 |      2 |
| Sender Name Preview | Read-only Textbox       | Email Preferences |   3 |      2 |
| Custom Sender Email | Read-only Textbox       | Email Preferences |   4 |      2 |
| CC Emails           | Dropdown / Multi-select | Email Preferences |   5 |      2 |
| BCC Emails          | Dropdown / Multi-select | Email Preferences |   6 |      2 |

---

# 9. UI Observations

## Missing Labels

None.

---

## Required Indicators

None visible.

---

## Placeholder Text

| Field      | Placeholder |
| ---------- | ----------- |
| CC Emails  | CC Emails   |
| BCC Emails | BCC Emails  |

---

## Default Values

| Field               | Default Value                                               |
| ------------------- | ----------------------------------------------------------- |
| Sender Name         | Company Name                                                |
| Sender Name Preview | MARUF DRESSES                                               |
| Custom Sender Email | [noreply@swipebilling.com](mailto:noreply@swipebilling.com) |

---

## Disabled / Read-only Controls

* Sender Name Preview
* Custom Sender Email

Both fields appear visually disabled/read-only.

---

## Alignment

* Excellent horizontal alignment.
* Labels aligned consistently.
* Inputs have equal widths.
* Good whitespace between rows.

---

## Duplicate Fields

None.

---

## UI/UX Patterns

* Helper text displayed beneath configurable fields.
* Read-only preview fields are visually muted.
* Consistent form spacing.
* Minimalistic enterprise settings layout.
* Logical progression from sender identity to recipient settings.

---

# 10. Text Wireframe (ASCII Layout)

```text
────────────────────────────────────────────────────────────────────────────

                               PREFERENCES

Document | Products & Inventory | Subscriptions | POS |
Customise Links | Notifications | Email | AI

────────────────────────────────────────────────────────────────────────────

SECTION: Email Preferences

[ + Email Templates ]

────────────────────────────────────────────────────────────────────────────

Sender Name
This will appear in the sender name and email subject.

                          [ Company Name ▼ ]

────────────────────────────────────────────────────────────────────────────

Sender Name Preview

                          [ MARUF DRESSES ]

────────────────────────────────────────────────────────────────────────────

Custom Sender Email

                          [ noreply@swipebilling.com ]

────────────────────────────────────────────────────────────────────────────

CC Emails
Emails that will be CC'd in all outgoing emails.
By default, company email will be included.

[ CC Emails ▼ ]

────────────────────────────────────────────────────────────────────────────

BCC Emails
Emails that will be BCC'd in all outgoing emails.

[ BCC Emails ▼ ]

────────────────────────────────────────────────────────────────────────────

[ Save Changes ]

────────────────────────────────────────────────────────────────────────────
```

# Complete Visible Text Inventory

## Promotional Banner

* Bulk Edit, Download, Merge & Convert Your Docs
* Upgrade Now 🚀

## Page Heading

* Preferences

## Primary Tabs

* Document
* Products & Inventory
* Subscriptions
* POS
* Customise Links
* Notifications
* Email
* AI

## Section Heading

* Email Preferences

## Buttons

* Email Templates
* Save Changes
* Upgrade Now 🚀
* Back to Home

## Field Labels

* Sender Name
* Sender Name Preview
* Custom Sender Email
* CC Emails
* BCC Emails

## Helper Text

* This will appear in the sender name and email subject.
* Emails that will be CC'd in all outgoing emails. By default, company email will be included.
* Emails that will be BCC'd in all outgoing emails.

## Default Field Values

* Company Name
* MARUF DRESSES
* [noreply@swipebilling.com](mailto:noreply@swipebilling.com)

## Sidebar Items

### Profile

* Company Details
* User Profile
* All Users / Roles

### General Settings

* Preferences
* Thermal Print Settings
* Barcode Settings
* Signatures
* Notes & Terms
* Auto Reminders

### Banks and Payments

* Banks
* Swipe Wallet

### Integrations & Apps

* Swipe AI
* Payment Gateway
* Tally Integration
* API & Webhooks
* More

### Others

* Advanced Features

This analysis preserves every visible heading, label, helper text, placeholder, default value, button, navigation item, banner text, and page structure exactly as shown in the uploaded screenshot, without inferring any hidden or non-visible elements.



# UI Analysis — Document Notes and Terms → Notes (Dropdown Expanded)

---

# 1. Page Overview

## Page Title

**Document Notes and Terms**

---

## Purpose of the Page

This page allows users to create, manage, and organize reusable **Document Notes** that can be attached to different document types (such as Invoice, Purchase, Quotation, Delivery Challan, etc.). Users can switch between **Notes** and **Terms**, filter notes by document type using a dropdown, and create new invoice notes.

---

## Total Number of Sections / Cards / Forms

| Component                | Count |
| ------------------------ | ----: |
| Left Sidebar Navigation  |     1 |
| Top Header               |     1 |
| Promotional Banner       |     1 |
| Main Content Card        |     1 |
| Document Notes Form Area |     1 |
| Document Type Dropdown   |     1 |
| Empty State Panel        |     1 |
| Footer                   |     1 |
| Floating WhatsApp Button |     1 |

---

# 2. Section-wise Analysis

---

# Section 1 — Main Page Header

### Heading

**Document Notes and Terms**

Description

None visible.

Rows: **1**

Columns: **1**

---

# Section 2 — Tab Navigation

Rows: **1**

Columns: **2**

| Column | Control                  |
| ------ | ------------------------ |
| 1      | **Notes** (Active Tab)   |
| 2      | **Terms** (Inactive Tab) |

---

# Section 3 — Notes Management

Contains document selection and note creation controls.

---

## Row 1 (2 Columns)

### Column 1

Label

None

Field

Dropdown

Visible Selected Value

**Invoice**

Placeholder

None

Dropdown State

**Expanded**

---

### Expanded Dropdown Menu Items

Exactly visible:

1. **Invoice** *(Selected)*
2. Sales Return
3. Purchase
4. Purchase Return
5. Purchase Order
6. Quotation
7. Delivery Challan
8. Pro Forma Invoice

---

### Column 2

Button

**+ New Invoice Notes**

Type

Primary Button

Alignment

Right

---

## Row 2 (Single Column)

### Empty State Card

Field Type

Information Panel

Visible Text

> **No invoice notes yet. Use the button above to add one.**

No actions available inside the panel.

---

# 3. Buttons & Actions

| Button                   | Type                   | Position                   | Alignment |
| ------------------------ | ---------------------- | -------------------------- | --------- |
| + New Invoice Notes      | Primary                | Top-right of Notes section | Right     |
| Back to Home             | Navigation             | Sidebar                    | Left      |
| Upgrade Now 🚀           | Promotional CTA        | Banner                     | Center    |
| WhatsApp Floating Button | Floating Action Button | Bottom-right               | Floating  |

---

## Dropdown Actions

The expanded dropdown provides the following selectable options:

| Option            |
| ----------------- |
| Invoice           |
| Sales Return      |
| Purchase          |
| Purchase Return   |
| Purchase Order    |
| Quotation         |
| Delivery Challan  |
| Pro Forma Invoice |

---

# 4. Tables

No tables are present.

| Feature       | Available |
| ------------- | --------- |
| Table         | ❌         |
| Search        | ❌         |
| Filters       | ❌         |
| Pagination    | ❌         |
| Bulk Actions  | ❌         |
| Sorting       | ❌         |
| Row Selection | ❌         |
| Status Badges | ❌         |

---

# 5. Navigation Elements

---

## Header

Visible Header Components

* Swipe Logo
* Company Avatar (**MD**)
* MARUF DRESSES
* Change Company
* Ask SwipeAI Search Bar
* ctrl+k shortcut
* Lightning Icon
* Notification Bell
* Announcement Icon
* User Profile Icon

---

## Promotional Banner

Visible Text

**Bulk Edit, Download, Merge & Convert Your Docs**

CTA

**Upgrade Now 🚀**

---

## Sidebar

### Back Navigation

* Back to Home

---

### Profile

* Company Details
* User Profile
* All Users / Roles

---

### General Settings

* Preferences
* Thermal Print Settings
* Barcode Settings
* Signatures
* **Notes & Terms** *(Selected)*
* Auto Reminders

---

### Banks and Payments

* Banks
* Swipe Wallet

---

### Integrations & Apps

* Swipe AI
* Payment Gateway 🔒
* Tally Integration 🔒
* API & Webhooks
* More

---

### Others

* Advanced Features

---

## Page Navigation

Tabs

* Notes *(Active)*
* Terms

---

# 6. Cards, Panels & Components

Present Components

* Main Card
* Sidebar
* Header
* Promotional Banner
* Tabs
* Dropdown
* Expanded Dropdown Menu
* Primary Button
* Empty State Card
* Floating WhatsApp Button

---

Not Present

* Tables
* Accordions
* Modals
* Alerts
* Checkboxes
* Radio Buttons
* Toggle Switches
* Upload Controls
* Rich Text Editors
* Date Pickers
* Progress Bars

---

# 7. Layout Structure

---

## Overall Layout

```text
Header

Promotional Banner

Document Notes and Terms

Notes | Terms

────────────────────────────────────────────────────────────

[ Invoice ▼ ]

                                   [ + New Invoice Notes ]

────────────────────────────────────────────────────────────

+ Invoice
  Sales Return
  Purchase
  Purchase Return
  Purchase Order
  Quotation
  Delivery Challan
  Pro Forma Invoice

────────────────────────────────────────────────────────────

┌──────────────────────────────────────────────────────────┐

 No invoice notes yet.
 Use the button above to add one.

└──────────────────────────────────────────────────────────┘

Footer
```

---

## Layout Characteristics

* Large centered content card.
* Two-column action row.
* Dropdown aligned left.
* Primary action aligned right.
* Expanded dropdown overlays the empty state panel.
* Empty state spans nearly full width.
* Clean enterprise spacing.

---

# 8. Complete Field Inventory

| Exact Label / Value | Field Type     | Section | Row | Column |
| ------------------- | -------------- | ------- | --: | -----: |
| Invoice             | Dropdown       | Notes   |   1 |      1 |
| + New Invoice Notes | Primary Button | Notes   |   1 |      2 |

### Dropdown Menu Items

| Value             | Type            |
| ----------------- | --------------- |
| Invoice           | Dropdown Option |
| Sales Return      | Dropdown Option |
| Purchase          | Dropdown Option |
| Purchase Return   | Dropdown Option |
| Purchase Order    | Dropdown Option |
| Quotation         | Dropdown Option |
| Delivery Challan  | Dropdown Option |
| Pro Forma Invoice | Dropdown Option |

---

# 9. UI Observations

## Missing Labels

The document selector dropdown does **not** have a visible label. Users infer its purpose from the selected value.

---

## Placeholder

None visible.

---

## Required Indicators

None.

---

## Default Value

Dropdown

**Invoice**

---

## Disabled Controls

None.

---

## Read-only Controls

None.

---

## Empty State

The page displays:

> **No invoice notes yet. Use the button above to add one.**

indicating no records currently exist for the selected document type.

---

## Alignment

* Good spacing between tabs and controls.
* Button aligned to the far right.
* Dropdown width consistent with design system.
* Empty state centered horizontally.

---

## UX Patterns

* Context-sensitive button label ("New Invoice Notes") changes based on selected document type.
* Dropdown overlay does not resize the page layout.
* Empty state provides clear guidance for first-time users.

---

# 10. Text Wireframe (ASCII Layout)

```text
────────────────────────────────────────────────────────────────────────────

                    DOCUMENT NOTES AND TERMS

────────────────────────────────────────────────────────────────────────────

Notes | Terms

────────────────────────────────────────────────────────────────────────────

┌──────────────────────────────┐

 Invoice ▼

───────────────────────────────
✓ Invoice
  Sales Return
  Purchase
  Purchase Return
  Purchase Order
  Quotation
  Delivery Challan
  Pro Forma Invoice

└──────────────────────────────┘

                                 [ + New Invoice Notes ]

────────────────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────────────────┐

            No invoice notes yet.
            Use the button above to add one.

└─────────────────────────────────────────────────────────────────────────┘

────────────────────────────────────────────────────────────────────────────
```

# Complete Visible Text Inventory

## Promotional Banner

* Bulk Edit, Download, Merge & Convert Your Docs
* Upgrade Now 🚀

## Page Heading

* Document Notes and Terms

## Tabs

* Notes
* Terms

## Dropdown Selected Value

* Invoice

## Expanded Dropdown Options

1. Invoice
2. Sales Return
3. Purchase
4. Purchase Return
5. Purchase Order
6. Quotation
7. Delivery Challan
8. Pro Forma Invoice

## Primary Button

* * New Invoice Notes

## Empty State Message

* No invoice notes yet. Use the button above to add one.

## Sidebar

### Profile

* Company Details
* User Profile
* All Users / Roles

### General Settings

* Preferences
* Thermal Print Settings
* Barcode Settings
* Signatures
* Notes & Terms
* Auto Reminders

### Banks and Payments

* Banks
* Swipe Wallet

### Integrations & Apps

* Swipe AI
* Payment Gateway
* Tally Integration
* API & Webhooks
* More

### Others

* Advanced Features

This analysis includes every visible heading, tab, dropdown option, button, empty-state message, navigation item, promotional text, and UI component shown in the uploaded screenshots, without inferring or inventing any hidden elements.




# UI Analysis — Auto Reminders

---

# 1. Page Overview

## Page Title

**Auto Reminders**

---

## Purpose of the Page

This page allows users to configure automated reminders that are sent to customers ("Party") or to themselves for business documents such as invoices, quotations, and outstanding balances. It displays SMS credit information, reminder rules, delivery channels, status, and provides actions to add, edit, or manage reminders.

---

## Total Number of Sections / Cards / Forms

| Component                | Count |
| ------------------------ | ----: |
| Left Sidebar Navigation  |     1 |
| Top Header               |     1 |
| Promotional Banner       |     1 |
| Main Content Card        |     1 |
| SMS Credit Summary Card  |     1 |
| Reminder Tabs            |     1 |
| Reminder List Card       |     1 |
| Reminder Records         |     2 |
| Footer                   |     1 |
| Floating WhatsApp Button |     1 |

---

# 2. Section-wise Analysis

---

# Section 1 — Page Header

### Heading

**Auto Reminders**

Description

None.

Rows: **1**

Columns: **1**

---

# Section 2 — Credit Summary Card

Displays SMS balance information.

---

## Row 1 (3 Columns)

### Column 1

**Credit balance**

Field Type

Display Text (Read-only)

Visible Value

**19.20**

---

### Column 2

**Messages you can send**

Field Type

Display Text

Visible Value

**95 (0.20 credits/message)**

Additional Component

Information Icon

---

### Column 3

Button

**Recharge**

Type

Primary Button

Contains

External/Open icon

---

# Section 3 — Reminder Navigation Tabs

Rows: **1**

Columns: **2**

| Column | Tab                               |
| ------ | --------------------------------- |
| 1      | **Reminders To Party** *(Active)* |
| 2      | **Reminders To Me** *(Inactive)*  |

---

# Section 4 — Reminder Management

---

## Row 1 (2 Columns)

### Column 1

Instruction Text

**Set up auto reminders for invoices, quotations, and outstanding customer balances.**

Field Type

Information Text

---

### Column 2

Button

**+ Add Reminder**

Type

Primary Button

Alignment

Right

---

# Section 5 — Reminder List

Contains reminder records.

---

## Reminder Record 1

Rows: **1**

Columns: **5**

### Column 1

Notification Icon

Type

Bell Icon Button (Read-only)

---

### Column 2

Primary Text

**Invoice · 1 day before due date**

Secondary Text

**10:00 am**

Field Type

Display Text

---

### Column 3

Delivery Channels

Displayed as Chips

* SMS
* Email
* WhatsApp

---

### Column 4

Status Badge

**Inactive**

Type

Status Badge

---

### Column 5

Actions

* Edit
* More (Three-dot menu)

---

## Reminder Record 2

Rows: **1**

Columns: **5**

### Column 1

Bell Icon

---

### Column 2

Primary Text

**Invoice · on due date**

Secondary Text

**10:00 am**

---

### Column 3

Delivery Chips

* SMS
* Email
* WhatsApp

---

### Column 4

Status Badge

**Inactive**

---

### Column 5

Actions

* Edit
* More Menu

---

# 3. Buttons & Actions

| Button                   | Type            | Position           | Alignment |
| ------------------------ | --------------- | ------------------ | --------- |
| Recharge                 | Primary         | Credit Summary     | Left      |
| + Add Reminder           | Primary         | Reminder Header    | Right     |
| Edit                     | Secondary       | Each Reminder Row  | Right     |
| More (•••)               | Icon            | Each Reminder Row  | Right     |
| Back to Home             | Navigation      | Sidebar            | Left      |
| Upgrade Now 🚀           | CTA             | Promotional Banner | Center    |
| WhatsApp Floating Button | Floating Action | Bottom-right       | Floating  |

---

# 4. Tables

Although visually presented as list cards, the reminder records behave like a table.

## Reminder List

### Column Headers (Implicit)

1. Reminder
2. Schedule
3. Channels
4. Status
5. Actions

---

### Search Box

Not visible.

---

### Filters

Not visible.

---

### Pagination

Not visible.

---

### Bulk Actions

Not visible.

---

### Sorting

Not visible.

---

### Row Selection

Not available.

---

### Status Badges

* Inactive
* Inactive

---

# 5. Navigation Elements

---

## Header

Visible Components

* Swipe Logo
* Company Avatar (MD)
* MARUF DRESSES
* Change Company
* Ask SwipeAI Search Box
* ctrl+k shortcut
* Lightning Icon
* Notification Bell
* Announcement Icon
* User Profile

---

## Promotional Banner

Text

**Bulk Edit, Download, Merge & Convert Your Docs**

CTA

**Upgrade Now 🚀**

---

## Sidebar

### Navigation

* Back to Home

---

### Profile

* Company Details
* User Profile
* All Users / Roles

---

### General Settings

* Preferences
* Thermal Print Settings
* Barcode Settings
* Signatures
* Notes & Terms
* **Auto Reminders** *(Selected)*

---

### Banks and Payments

* Banks
* Swipe Wallet

---

### Integrations & Apps

* Swipe AI
* Payment Gateway 🔒
* Tally Integration 🔒
* API & Webhooks
* More

---

### Others

* Advanced Features

---

## Page Tabs

* Reminders To Party *(Active)*
* Reminders To Me

---

# 6. Cards, Panels & Components

Present Components

* Credit Summary Card
* Reminder Card
* Reminder Rows
* Status Badges
* Delivery Chips
* Bell Icons
* Edit Buttons
* Overflow (Three-dot) Menus
* Tabs
* Primary Buttons
* Footer
* Floating WhatsApp Button

---

Not Present

* Textboxes
* Dropdowns
* Checkboxes
* Radio Buttons
* Date Pickers
* Upload Controls
* Rich Text Editors
* Accordions
* Progress Bars
* Modals

---

# 7. Layout Structure

## Overall Layout

```text
Header

Promotional Banner

Auto Reminders

┌──────────────────────────────────────────────────────────────┐
│ Credit balance      Messages you can send      Recharge      │
│ 19.20               95 (0.20 credits/message)               │
└──────────────────────────────────────────────────────────────┘

Reminders To Party | Reminders To Me

Set up auto reminders for invoices, quotations,
and outstanding customer balances.

                                       [+ Add Reminder]

──────────────────────────────────────────────────────────────

🔔 Invoice · 1 day before due date
   10:00 am

 SMS   Email   WhatsApp

 Inactive      Edit      ...

──────────────────────────────────────────────────────────────

🔔 Invoice · on due date
   10:00 am

 SMS   Email   WhatsApp

 Inactive      Edit      ...

Footer
```

---

## Layout Characteristics

* Single-column enterprise layout.
* Credit card displayed above reminder list.
* Reminder rows use five-column horizontal alignment.
* Action buttons consistently aligned to the far right.
* Delivery channels displayed as chips.
* Status displayed immediately before action buttons.

---

# 8. Complete Field Inventory

| Exact Label                     | Field Type       | Section         | Row | Column |
| ------------------------------- | ---------------- | --------------- | --: | -----: |
| Credit balance                  | Display          | Credit Summary  |   1 |      1 |
| 19.20                           | Read-only Value  | Credit Summary  |   1 |      1 |
| Messages you can send           | Display          | Credit Summary  |   1 |      2 |
| 95 (0.20 credits/message)       | Read-only Value  | Credit Summary  |   1 |      2 |
| Recharge                        | Primary Button   | Credit Summary  |   1 |      3 |
| Reminders To Party              | Tab              | Navigation      |   1 |      1 |
| Reminders To Me                 | Tab              | Navigation      |   1 |      2 |
| + Add Reminder                  | Primary Button   | Reminder Header |   1 |      2 |
| Invoice · 1 day before due date | Display          | Reminder Row 1  |   1 |      2 |
| 10:00 am                        | Display          | Reminder Row 1  |   1 |      2 |
| SMS                             | Chip             | Reminder Row 1  |   1 |      3 |
| Email                           | Chip             | Reminder Row 1  |   1 |      3 |
| WhatsApp                        | Chip             | Reminder Row 1  |   1 |      3 |
| Inactive                        | Status Badge     | Reminder Row 1  |   1 |      4 |
| Edit                            | Secondary Button | Reminder Row 1  |   1 |      5 |
| More                            | Icon Button      | Reminder Row 1  |   1 |      5 |
| Invoice · on due date           | Display          | Reminder Row 2  |   1 |      2 |
| 10:00 am                        | Display          | Reminder Row 2  |   1 |      2 |
| SMS                             | Chip             | Reminder Row 2  |   1 |      3 |
| Email                           | Chip             | Reminder Row 2  |   1 |      3 |
| WhatsApp                        | Chip             | Reminder Row 2  |   1 |      3 |
| Inactive                        | Status Badge     | Reminder Row 2  |   1 |      4 |
| Edit                            | Secondary Button | Reminder Row 2  |   1 |      5 |
| More                            | Icon Button      | Reminder Row 2  |   1 |      5 |

---

# 9. UI Observations

## Missing Labels

* Reminder list has no explicit table headers; structure relies on row layout.
* Bell icon has no visible tooltip or label.

---

## Required Indicators

None visible.

---

## Placeholder Text

None.

---

## Default Values

* Credit Balance: **19.20**
* Messages Remaining: **95**
* Reminder Time: **10:00 am**
* Reminder Status: **Inactive**

---

## Disabled Controls

None visible.

---

## Read-only Fields

* Credit Balance
* Messages you can send
* Reminder descriptions
* Reminder times

---

## Status Badges

Both reminder records are marked:

**Inactive**

---

## Alignment

* Excellent horizontal spacing.
* Consistent row heights.
* Action buttons aligned uniformly.
* Chips evenly spaced.

---

## UX Patterns

* Uses chips to represent reminder delivery channels.
* Status badges visually separate reminder state from actions.
* Overflow menu allows future extensibility without cluttering the interface.
* Credit summary is prominently positioned above reminder management for quick visibility.

---

# 10. Text Wireframe (ASCII Layout)

```text
────────────────────────────────────────────────────────────────────────────

                         AUTO REMINDERS

────────────────────────────────────────────────────────────────────────────

┌──────────────────────────────────────────────────────────────────────────┐
│ Credit balance     Messages you can send        [ Recharge ]             │
│ 19.20              95 (0.20 credits/message)                            │
└──────────────────────────────────────────────────────────────────────────┘

Reminders To Party | Reminders To Me

Set up auto reminders for invoices, quotations,
and outstanding customer balances.

                                              [ + Add Reminder ]

────────────────────────────────────────────────────────────────────────────

🔔 Invoice · 1 day before due date
   10:00 am

 SMS   Email   WhatsApp

 Inactive                [ Edit ]     [ ... ]

────────────────────────────────────────────────────────────────────────────

🔔 Invoice · on due date
   10:00 am

 SMS   Email   WhatsApp

 Inactive                [ Edit ]     [ ... ]

────────────────────────────────────────────────────────────────────────────

Footer
```

# Complete Visible Text Inventory

## Promotional Banner

* Bulk Edit, Download, Merge & Convert Your Docs
* Upgrade Now 🚀

## Page Heading

* Auto Reminders

## Credit Summary

* Credit balance
* 19.20
* Messages you can send
* 95 (0.20 credits/message)
* Recharge

## Tabs

* Reminders To Party
* Reminders To Me

## Instruction Text

* Set up auto reminders for invoices, quotations, and outstanding customer balances.

## Primary Button

* * Add Reminder

## Reminder Row 1

* Invoice · 1 day before due date
* 10:00 am
* SMS
* Email
* WhatsApp
* Inactive
* Edit

## Reminder Row 2

* Invoice · on due date
* 10:00 am
* SMS
* Email
* WhatsApp
* Inactive
* Edit

## Sidebar

### Profile

* Company Details
* User Profile
* All Users / Roles

### General Settings

* Preferences
* Thermal Print Settings
* Barcode Settings
* Signatures
* Notes & Terms
* Auto Reminders

### Banks and Payments

* Banks
* Swipe Wallet

### Integrations & Apps

* Swipe AI
* Payment Gateway
* Tally Integration
* API & Webhooks
* More

### Others

* Advanced Features

This breakdown preserves all visible headings, labels, values, buttons, tabs, chips, badges, icons, instructional text, sidebar entries, promotional content, and layout shown in the uploaded screenshot without inferring hidden functionality.



# UI Analysis — Banks (Main Page + Edit Bank Details Drawer)

This analysis covers **both screenshots**:

1. **Banks Management Page**
2. **Bank Details Edit Drawer (Slide-over Panel)**

All visible headings, labels, values, buttons, helper text, badges, notes, and controls are included exactly as shown.

---

# 1. Page Overview

## Page Title

**Banks**

---

## Purpose of the Page

This page allows users to:

* Manage business bank accounts
* Configure invoice bank details
* Link UPI IDs
* Generate Dynamic QR codes
* Set default bank accounts
* Edit bank information
* Add new bank details
* Transfer funds
* Connect bank integrations (Axis)
* View payment notes and restrictions

The second screenshot shows the **Bank Details** edit drawer used to update an existing bank account.

---

## Total Sections / Cards / Forms

| Component                | Count |
| ------------------------ | ----: |
| Sidebar                  |     1 |
| Header                   |     1 |
| Promotional Banner       |     1 |
| Main Page Card           |     1 |
| QR Promotion Card        |     1 |
| Action Button Row        |     1 |
| Bank List Card           |     1 |
| Bank Records             |     2 |
| Notes Card               |     1 |
| Edit Drawer              |     1 |
| Edit Form                |     1 |
| Rich Text Editor         |     1 |
| Footer                   |     1 |
| Floating WhatsApp Button |     1 |

---

# 2. Section-wise Analysis

---

# Section 1 — Page Header

Heading

**Banks**

Rows

1

Columns

1

---

# Section 2 — Dynamic QR Promotion Card

Rows

3

Columns

1

---

## Row 1

Text

**Create dynamic QR codes on Invoices at ZERO Transaction charge!**

---

## Row 2

Text

**Link your UPI ID with the Bank Account now to generate dynamic QR codes on Invoices and Bills.**

---

## Row 3

Text

**Payments will be settled to your bank account linked with UPI ID instantly.**

---

# Section 3 — Action Buttons

Rows

1

Columns

3

| Column | Button             | Type    |
| ------ | ------------------ | ------- |
| 1      | + New Bank Details | Primary |
| 2      | Transfer Funds     | Primary |
| 3      | Connect to Axis    | Primary |

---

# Section 4 — Bank Accounts List

Contains two records.

---

## Record 1

Rows

1

Columns

4

### Column 1

Bank Icon

---

### Column 2

**Cash**

Display Text

---

### Column 3

Empty

---

### Column 4

Actions

* Edit
* More (...)

---

## Record 2

Rows

2

Columns

4

---

### Column 1

Bank Building Icon

---

### Column 2

Primary Text

**IDFC First Bank Limited**

Secondary Text

```
8520
MARUF DRESSES
Athgarh
AXIS8520
```

Third Line

```
UPI:
7809789178@ybl
```

---

### Column 3

Badge

**Default**

---

### Column 4

Actions

* Edit
* More (...)

---

# Section 5 — Please Note

Heading

**Please Note**

Rows

4

Columns

1

---

### Row 1

**UPI ID like swipe9@icici can be added while adding the bank to show QR code on invoices along with the bank details. Learn more**

---

### Row 2

**Beneficiary Name, Swift Code etc.. can be added in the notes section while adding the bank details.**

---

### Row 3

**If your payment gateway is active then you will not be able to edit the Account number, IFSC code of the bank details.**

---

### Row 4

**Deleting the bank account from here will remove the bank details from all existing invoices and it is irreversible.**

Displayed in red.

---

# Section 6 — Edit Drawer

Title

**Bank Details**

Drawer Type

Right Slide-over Modal

---

## Drawer Header

Rows

1

Columns

2

| Column | Component     |
| ------ | ------------- |
| Left   | Close (X)     |
| Right  | Save & Update |

---

# Section 7 — Bank Information Form

---

## Row 1

### Column 1

**Bank Name**

Required

Yes (*)

Field Type

Textbox

Value

**IDFC First Bank Limited**

---

## Row 2

### Column 1

**Branch Name**

Required

Yes (*)

Textbox

Value

**Athgarh**

---

## Row 3

### Column 1

**UPI**

OPTIONAL

Textbox

Value

```
7809789178@ybl
```

### Column 2

Button

**Verify UPI ID**

---

Helper Text

```
This UPI ID will be used to generate Dynamic QR codes on the invoices and bills.
```

---

## Row 4

### Column 1

**UPI Number**

OPTIONAL

Textbox

Value

```
780978969
```

Helper Text

```
This bank account information will be displayed in online order details only and will not appear on invoices or bills.
```

---

## Row 5

### Column 1

**Opening Balance**

OPTIONAL

Number Input

Value

```
0
```

---

## Row 6

### Column 1

**Notes**

Textbox

Value

```
Athgarh
```

---

## Row 7

Another

### UPI

OPTIONAL

Textbox

Value

```
7809789178@ybl
```

Button

Verify UPI ID

---

## Row 8

UPI Number

OPTIONAL

Textbox

Value

```
780978969
```

---

## Row 9

Opening Balance

OPTIONAL

Number Input

Value

```
0
```

---

## Row 10

Notes

Rich Text Editor

Toolbar

* Bold
* Italic
* Underline
* Strike
* UL
* OL

Placeholder

```
Beneficiary Name, SWIFT Code etc..
```

---

## Row 11

Default

Toggle Switch

Default Value

ON

Helper Text

```
This will override your previous default bank
```

---

## Bottom Action Bar

Button

**Save & Update**

Primary

---

# 3. Buttons & Actions

## Main Page

| Button             | Type      | Position      |
| ------------------ | --------- | ------------- |
| + New Bank Details | Primary   | Top Left      |
| Transfer Funds     | Primary   | Top Left      |
| Connect to Axis    | Primary   | Top Left      |
| Edit               | Secondary | Each Bank Row |
| More (...)         | Icon      | Each Bank Row |
| Upgrade Now        | CTA       | Banner        |

---

## Drawer

| Button        | Type      |
| ------------- | --------- |
| Save & Update | Primary   |
| Verify UPI ID | Secondary |
| Close (X)     | Icon      |

---

# 4. Tables

## Bank List

Columns

1. Icon
2. Bank Information
3. Status
4. Actions

Available Actions

* Edit
* More

Search

No

Filters

No

Pagination

No

Sorting

No

Bulk Actions

No

Status Badge

Default

---

# 5. Navigation Elements

## Sidebar

### Profile

* Company Details
* User Profile
* All Users / Roles

---

### General Settings

* Preferences
* Thermal Print Settings
* Barcode Settings
* Signatures
* Notes & Terms
* Auto Reminders

---

### Banks and Payments

* **Banks** (Selected)
* Swipe Wallet

---

### Integrations

* Swipe AI
* Payment Gateway
* Tally Integration
* API & Webhooks
* More

---

### Others

* Advanced Features

---

# 6. Cards, Panels & Components

Present Components

* Promotion Card
* Bank List Card
* Note Card
* Drawer Panel
* Rich Text Editor
* Toggle
* Text Inputs
* Number Inputs
* Status Badge
* Helper Text
* Primary Buttons
* Secondary Buttons
* Icon Buttons
* Floating WhatsApp Button

Not Present

* Tables with headers
* Checkboxes
* Date Pickers
* File Upload
* Radio Buttons
* Accordions
* Progress Bars

---

# 7. Layout Structure

```
Header

Promotion Banner

Banks

┌────────────────────────────────────────────┐
│ QR Promotion Card                          │
└────────────────────────────────────────────┘

[+ New Bank Details]
[Transfer Funds]
[Connect to Axis]

──────────────────────────────────────────────

Cash                             Edit (...)

──────────────────────────────────────────────

IDFC First Bank Limited

8520
MARUF DRESSES
Athgarh
AXIS8520

UPI:
7809789178@ybl

          Default      Edit (...)

──────────────────────────────────────────────

Please Note

•
•
•
•

──────────────────────────────────────────────

Footer
```

---

## Drawer Layout

```
┌──────────────────────────────────────────────┐
│ X  Bank Details          Save & Update       │
├──────────────────────────────────────────────┤

Bank Name *

[____________________________]

Branch Name *

[____________________________]

UPI (OPTIONAL)

[_________________] [Verify UPI ID]

Helper Text

UPI Number

[________________]

Opening Balance

[0]

Notes

[________________]

UPI (OPTIONAL)

[_________________] [Verify UPI ID]

UPI Number

[________________]

Opening Balance

[0]

Notes

[B][I][U][S][UL][OL]

________________________________

Default

( Toggle ON )

This will override your previous default bank

[ Save & Update ]

└──────────────────────────────────────────────┘
```

---

# 8. Complete Field Inventory

| Label           | Field Type       | Section | Row | Column |
| --------------- | ---------------- | ------- | --- | ------ |
| Bank Name       | Textbox          | Drawer  | 1   | 1      |
| Branch Name     | Textbox          | Drawer  | 2   | 1      |
| UPI             | Textbox          | Drawer  | 3   | 1      |
| Verify UPI ID   | Button           | Drawer  | 3   | 2      |
| UPI Number      | Textbox          | Drawer  | 4   | 1      |
| Opening Balance | Number           | Drawer  | 5   | 1      |
| Notes           | Textbox          | Drawer  | 6   | 1      |
| UPI             | Textbox          | Drawer  | 7   | 1      |
| Verify UPI ID   | Button           | Drawer  | 7   | 2      |
| UPI Number      | Textbox          | Drawer  | 8   | 1      |
| Opening Balance | Number           | Drawer  | 9   | 1      |
| Notes           | Rich Text Editor | Drawer  | 10  | 1      |
| Default         | Toggle           | Drawer  | 11  | 1      |

---

# 9. UI Observations

## Required Fields

Visible

* Bank Name *
* Branch Name *

---

## Optional Fields

Visible

* UPI
* UPI Number
* Opening Balance

---

## Duplicate Controls

The drawer visibly contains **two repeated groups** of:

* UPI
* UPI Number
* Opening Balance

This appears to be duplicated in the current UI.

---

## Rich Text Editor

Toolbar includes

* Bold
* Italic
* Underline
* Strike
* UL
* OL

---

## Helper Text

Multiple contextual helper texts are shown beneath UPI-related fields, improving usability.

---

## Status Badge

Only one badge is displayed:

**Default**

---

## Alignment

* Consistent vertical spacing.
* Form fields are full-width.
* Save buttons appear in both the drawer header and footer for convenience.

---

## Notable UX Patterns

* Slide-over drawer enables editing without leaving the bank list.
* Critical warning is highlighted in red within the "Please Note" section.
* Verification action is adjacent to the UPI field.
* Default bank selection uses a toggle with explanatory helper text.
* Rich text editor supports formatted beneficiary and banking notes.
* The visible duplicate UPI/Opening Balance section may indicate either a rendering issue or repeated form block that should be reviewed.



# UI Analysis — Payment Gateway Integration (Integrations & Apps → Payment Gateway)

---

# 1. Page Overview

## Page Title

**Accept Online Payments with Swipe**

(Page navigation entry: **Payment Gateway**)

---

## Purpose of the Page

This page promotes Swipe's online payment gateway integration. It explains the benefits of accepting online payments through Swipe and encourages users to upgrade their subscription to enable payment gateway integrations such as Razorpay and Cashfree.

Unlike a configuration page, this is a **feature promotion / upgrade landing page** with a call-to-action rather than a settings form.

---

## Total Number of Sections / Cards / Forms

| Component                   | Count |
| --------------------------- | ----: |
| Left Sidebar                |     1 |
| Top Header                  |     1 |
| Promotional Upgrade Banner  |     1 |
| Main Content Card           |     1 |
| Breadcrumb Navigation       |     1 |
| Illustration Section        |     1 |
| Feature Description Section |     1 |
| CTA Button                  |     1 |
| Contact Information Row     |     1 |
| Floating WhatsApp Button    |     1 |
| Footer                      |     1 |

There are **no forms**, **no tables**, and **no editable settings** on this page.

---

# 2. Section-wise Analysis

---

# Section 1 — Global Header

Located at the top.

### Row 1 (5+ Columns)

| Column | Component           | Type              |
| ------ | ------------------- | ----------------- |
| 1      | Swipe Logo          | Brand Logo        |
| 2      | Company Avatar (MD) | Avatar            |
| 3      | MARUF DRESSES       | Company Name      |
| 4      | Change Company      | Action Link       |
| 5      | Ask SwipeAI         | Search/Input      |
| 6      | ctrl+k              | Keyboard Shortcut |
| 7      | Lightning Icon      | Header Icon       |
| 8      | Notification Icon   | Header Icon       |
| 9      | Megaphone Icon      | Header Icon       |
| 10     | User Profile Icon   | User Menu         |

---

# Section 2 — Promotional Banner

Position

Below header.

### Row 1 (3 Columns)

| Column | Content                                        |
| ------ | ---------------------------------------------- |
| 1      | Bulk Edit, Download, Merge & Convert Your Docs |
| 2      | Upgrade Now 🚀                                 |
| 3      | Promotional Banner Background                  |

Banner Type

Informational CTA Banner

---

# Section 3 — Main Content Card

Contains the payment gateway promotion.

---

## Row 1 (1 Column)

### Breadcrumb

**← All Integrations**

Type

Breadcrumb Navigation

---

## Row 2 (2 Columns)

### Left Column

Illustration

Large payment gateway illustration containing:

* Mobile phone
* Card machine
* QR payment
* Razorpay logo
* Cashfree Payments logo
* Shield
* Currency
* Payment icons

Component Type

Illustration / SVG

---

### Right Column

Heading

**Accept Online Payments with Swipe**

Type

Heading (H1)

---

### Feature List

Three bullet points.

---

#### Bullet 1

✔

**Accept payments through UPI, cards, net banking, and wallets**

---

#### Bullet 2

✔

**Connect Razorpay or Cashfree with Swipe**

---

#### Bullet 3

✔

**Track payment confirmations and settlements from one place**

---

### CTA Button

Text

**Upgrade Now 🚀**

Button Type

Primary CTA Button

---

### Contact Row

Contains:

#### Item 1

Headset Icon

**Talk to a specialist**

---

#### Item 2

WhatsApp / Phone Icon

**+91 812 133 5436**

---

# 3. Buttons & Actions

| Button                      | Type                   | Position     | Alignment |
| --------------------------- | ---------------------- | ------------ | --------- |
| Upgrade Now 🚀 (Top Banner) | Primary CTA            | Top Banner   | Center    |
| Upgrade Now 🚀 (Main Card)  | Primary CTA            | Main Content | Left      |
| Back (← All Integrations)   | Breadcrumb Link        | Top Left     | Left      |
| WhatsApp Floating Button    | Floating Action Button | Bottom Right | Floating  |
| Change Company              | Text Link              | Header       | Left      |

---

# 4. Tables

No tables are present.

| Feature       | Present |
| ------------- | ------- |
| Table         | ❌       |
| Search Box    | ❌       |
| Filters       | ❌       |
| Pagination    | ❌       |
| Bulk Actions  | ❌       |
| Sorting       | ❌       |
| Row Selection | ❌       |
| Status Badges | ❌       |

---

# 5. Navigation Elements

## Breadcrumb

* ← All Integrations

---

## Sidebar Navigation

### Profile

* Company Details
* User Profile
* All Users / Roles

---

### General Settings

* Preferences
* Thermal Print Settings
* Barcode Settings
* Signatures
* Notes & Terms
* Auto Reminders

---

### Banks and Payments

* Banks
* Swipe Wallet

---

### Integrations & Apps

* Swipe AI
* **Payment Gateway** (Current Page)
* Tally Integration
* API & Webhooks
* More

---

### Others

* Advanced Features

---

## Header Actions

* Ask SwipeAI
* ctrl+k shortcut
* Lightning icon
* Notification icon
* Megaphone icon
* User profile icon

---

# 6. Cards, Panels & Components

## Cards

* Main Promotion Card
* Promotional Upgrade Banner

---

## Illustration

* Payment gateway illustration

---

## Buttons

* Upgrade Now 🚀
* Breadcrumb Link

---

## Icons

* Tick Icons (3)
* Headset Icon
* Phone / WhatsApp Icon
* Razorpay Logo
* Cashfree Payments Logo
* Floating WhatsApp Button

---

## Components Present

* Sidebar
* Breadcrumb
* CTA Button
* Hero Illustration
* Promotional Banner
* Feature List

---

## Components Not Present

* Forms
* Textboxes
* Dropdowns
* Date Pickers
* Upload Areas
* Checkboxes
* Toggles
* Radio Buttons
* Tables
* Rich Text Editors
* Progress Bars
* Accordions
* Modals
* Tooltips

---

# 7. Layout Structure

## Overall Layout

```
┌───────────────────────────────────────────────────────────────┐
│ Global Header                                                 │
├───────────────────────────────────────────────────────────────┤
│ Promotional Upgrade Banner                                    │
├───────────────┬───────────────────────────────────────────────┤
│               │                                               │
│ Sidebar       │ Breadcrumb: ← All Integrations                │
│ Navigation    │                                               │
│               │ ┌───────────────────────────────────────────┐ │
│               │ │                                           │ │
│               │ │ Illustration      Accept Online Payments  │ │
│               │ │                  with Swipe               │ │
│               │ │                                           │ │
│               │ │                  ✔ UPI                    │ │
│               │ │                  ✔ Razorpay              │ │
│               │ │                  ✔ Settlements           │ │
│               │ │                                           │ │
│               │ │               [ Upgrade Now 🚀 ]          │ │
│               │ │                                           │ │
│               │ │ Talk to a specialist                      │ │
│               │ │ +91 812 133 5436                          │ │
│               │ │                                           │ │
│               │ └───────────────────────────────────────────┘ │
├───────────────┴───────────────────────────────────────────────┤
│ Footer                                                        │
└───────────────────────────────────────────────────────────────┘
```

---

## Grid Layout

| Section      | Layout        |
| ------------ | ------------- |
| Header       | Horizontal    |
| Banner       | Single Row    |
| Main Card    | 2 Columns     |
| Feature List | Single Column |
| Contact Row  | Horizontal    |
| Footer       | Single Row    |

---

## Alignment

* Illustration aligned left
* Content aligned left
* CTA beneath feature list
* Contact row beneath CTA
* Large whitespace around content for emphasis

---

## Responsive Behavior (Visible)

* Two-column hero layout
* Wide centered content card
* Sidebar fixed on the left
* Floating WhatsApp button anchored to bottom-right

---

# 8. Complete Field Inventory

This page contains **no editable fields**.

| Label       | Field Type   | Section | Row | Column |
| ----------- | ------------ | ------- | --- | ------ |
| Ask SwipeAI | Search Input | Header  | 1   | 5      |

No other input controls are visible.

---

# 9. UI Observations

## Missing Labels

None.

Everything displayed is clearly labeled.

---

## Inconsistent Spacing

None observed.

Spacing is consistent throughout the hero section.

---

## Alignment Issues

None visible.

---

## Duplicate Fields

None.

---

## Disabled Controls

None.

---

## Read-only Fields

Only the **Ask SwipeAI** search field is visible but not interacted with in the screenshot.

---

## Notable UI/UX Patterns

* Clean hero-style landing page instead of a traditional settings page.
* Strong visual hierarchy with illustration on the left and messaging on the right.
* Primary call-to-action ("Upgrade Now 🚀") is repeated in both the top promotional banner and the main content area.
* Feature benefits are communicated using concise checklist items with tick icons.
* Breadcrumb ("← All Integrations") provides an easy return path.
* Contact information is surfaced directly below the CTA, reducing friction for users who need assistance.
* Ample whitespace keeps the page uncluttered and focuses attention on the upgrade action.
* Floating WhatsApp button offers persistent support access.


# UI Analysis — User Profile

---

# 1. Page Overview

## Page Title

**User Profile**

---

## Purpose of the Page

This page allows the logged-in user to manage their personal account profile. Users can:

* Upload/change their profile image.
* Edit their display name.
* View their registered mobile number.
* Add or update an email address.
* Verify their email.
* Connect their Google account.
* Save profile changes.
* Change their mobile number.
* Manage login sessions.
* Reset account data.
* Permanently delete their account.

---

## Total Number of Sections / Cards / Forms

| Component                 | Count |
| ------------------------- | ----: |
| Global Header             |     1 |
| Promotional Banner        |     1 |
| Left Sidebar              |     1 |
| Main Content Card         |     1 |
| User Profile Form         |     1 |
| Request Something Section |     1 |
| Danger Zone Section       |     1 |
| Footer                    |     1 |
| Floating WhatsApp Button  |     1 |

---

# 2. Section-wise Analysis

---

# Section 1 — Global Header

Located at the very top.

## Row 1 (10 Columns)

| Column | Component           | Type          |
| ------ | ------------------- | ------------- |
| 1      | Swipe Logo          | Logo          |
| 2      | Company Avatar (MD) | Avatar        |
| 3      | MARUF DRESSES       | Company Name  |
| 4      | Change Company      | Text Link     |
| 5      | Ask SwipeAI         | Search Input  |
| 6      | ctrl+k              | Shortcut Hint |
| 7      | Lightning Icon      | Icon Button   |
| 8      | Notification Icon   | Icon Button   |
| 9      | Announcement Icon   | Icon Button   |
| 10     | User Profile Icon   | User Menu     |

---

# Section 2 — Promotional Banner

Located below header.

### Row 1

| Column | Content                                        |
| ------ | ---------------------------------------------- |
| 1      | Bulk Edit, Download, Merge & Convert Your Docs |
| 2      | Upgrade Now 🚀                                 |

Type

Promotional Banner

---

# Section 3 — User Profile

Heading

**User Profile**

Contains the editable profile form.

---

## Row 1 (2 Columns)

| Left               | Right       |
| ------------------ | ----------- |
| **Profile Image:** | Upload Area |

### Column 1

Label

**Profile Image:**

Field Type

Static Label

---

### Column 2

Upload Component

Contains

* *
* Upload

Field Type

Image Upload

Placeholder

**Upload**

Default

No uploaded image visible.

---

## Row 2 (2 Columns)

| Left    | Right   |
| ------- | ------- |
| *Name:* | Textbox |

### Column 1

Label

***Name:**

Required Indicator

Red *

---

### Column 2

Field Type

Text Input

Default Value

**Chandan**

Placeholder

None

---

## Row 3 (2 Columns)

| Left          | Right   |
| ------------- | ------- |
| Phone Number: | Textbox |

### Column 1

Label

**Phone Number:**

---

### Column 2

Field Type

Disabled Textbox

Default Value

**9114949151**

Placeholder

None

Read-only

Yes (appears disabled)

---

## Row 4 (2 Columns)

| Left   | Right   |
| ------ | ------- |
| Email: | Textbox |

### Column 1

Label

**Email:**

---

### Column 2

Field Type

Text Input

Placeholder

**Email Address**

Default Value

Empty

---

## Row 5 (2 Columns)

| Left | Right               |
| ---- | ------------------- |
| —    | Verification Notice |

Contains

⚠

**Please Click here to verify your email**

Component Type

Alert / Information Link

---

## Row 6 (2 Columns)

| Left | Right         |
| ---- | ------------- |
| —    | Google Button |

Button

**Connect with Google**

Contains Google logo.

Type

OAuth Button

---

## Row 7 (2 Columns)

| Left        | Right |
| ----------- | ----- |
| Save Button | Empty |

Button

**Save & Update**

Type

Primary Button

Alignment

Left

---

# Section 4 — Request Something?

Heading

**Request Something?**

---

## Row 1

Text

**Want to Change mobile number?**

Link

**Click here**

---

## Row 2

Text

**Manage login sessions?**

Link

**Click here**

---

# Section 5 — Danger Zone

Heading

**Danger Zone**

(Text shown in red)

---

## Row 1

Text

**Want to Reset Your Account Data?**

Action Link

**Click here**

---

## Row 2

Text

**Want to Delete Your Account Permanently?**

Action Link

**Click here**

Additional Description

**Your request will be processed within 5-7 business days.**

---

# Section 6 — Footer

Contains

Logo

**swipe**

Copyright

**©2026 NextSpeed Technologies Private Limited. All rights reserved.**

Security Notice

🔒

**Data is secured via 'bank-grade' security**

---

# 3. Buttons & Actions

| Button / Action                         | Type          | Position          | Alignment |
| --------------------------------------- | ------------- | ----------------- | --------- |
| Upload                                  | Upload Button | Profile Image     | Center    |
| Save & Update                           | Primary       | Bottom Left       | Left      |
| Connect with Google                     | OAuth Button  | Below Email       | Left      |
| Click here (Verify Email)               | Text Link     | Below Email       | Left      |
| Click here (Change Mobile Number)       | Text Link     | Request Something | Left      |
| Click here (Manage Login Sessions)      | Text Link     | Request Something | Left      |
| Click here (Reset Account Data)         | Danger Link   | Danger Zone       | Left      |
| Click here (Delete Account Permanently) | Danger Link   | Danger Zone       | Left      |
| Upgrade Now 🚀                          | CTA Button    | Top Banner        | Center    |
| Change Company                          | Text Link     | Header            | Left      |

---

# 4. Tables

No tables are present.

| Feature       | Status |
| ------------- | ------ |
| Table         | ❌      |
| Search        | ❌      |
| Filters       | ❌      |
| Pagination    | ❌      |
| Sorting       | ❌      |
| Bulk Actions  | ❌      |
| Row Selection | ❌      |
| Status Badges | ❌      |

---

# 5. Navigation Elements

## Sidebar

### Profile

* Company Details
* **User Profile** (Current Page)
* All Users / Roles

---

### General Settings

* Preferences
* Thermal Print Settings
* Barcode Settings
* Signatures
* Notes & Terms
* Auto Reminders

---

### Banks and Payments

* Banks
* Swipe Wallet

---

### Integrations & Apps

* Swipe AI
* Payment Gateway
* Tally Integration
* API & Webhooks
* More

---

### Others

* Advanced Features

---

## Header Navigation

* Swipe Logo
* Company Avatar
* MARUF DRESSES
* Change Company
* Ask SwipeAI
* ctrl+k
* Lightning
* Notification
* Announcement
* User Menu

---

# 6. Cards, Panels & Components

## Cards

* User Profile Card
* Promotional Banner

---

## Components

* Image Upload Area
* Text Inputs
* Disabled Input
* Alert Message
* Google Authentication Button
* Primary Save Button
* Sidebar
* Footer
* Floating WhatsApp Button

---

## Alerts

⚠

Please Click here to verify your email

---

## File Upload

Profile Image Upload

---

## Components Not Present

* Accordion
* Modal
* Table
* Progress Bar
* Rich Text Editor
* Date Picker
* Toggle
* Checkbox
* Radio Button

---

# 7. Layout Structure

```
┌──────────────────────────────────────────────────────────────┐
│ Header                                                       │
├──────────────────────────────────────────────────────────────┤
│ Upgrade Banner                                               │
├───────────────┬──────────────────────────────────────────────┤
│ Sidebar       │ User Profile                                 │
│               │                                              │
│               │ Profile Image      [+ Upload]                │
│               │                                              │
│               │ *Name            [ Chandan ]                 │
│               │                                              │
│               │ Phone Number    [9114949151]                 │
│               │                                              │
│               │ Email           [Email Address]              │
│               │                                              │
│               │ ⚠ Please Click here to verify your email     │
│               │                                              │
│               │ [Connect with Google]                        │
│               │                                              │
│               │ [ Save & Update ]                            │
│               │                                              │
│               │ Request Something?                           │
│               │ • Change mobile number                       │
│               │ • Manage login sessions                      │
│               │                                              │
│               │ Danger Zone                                  │
│               │ • Reset Account Data                         │
│               │ • Delete Account Permanently                 │
│               │                                              │
├───────────────┴──────────────────────────────────────────────┤
│ Footer                                                       │
└──────────────────────────────────────────────────────────────┘
```

---

# 8. Complete Field Inventory

| Label         | Field Type       | Section      | Row | Column |
| ------------- | ---------------- | ------------ | --- | ------ |
| Profile Image | Image Upload     | User Profile | 1   | 2      |
| *Name         | Text Input       | User Profile | 2   | 2      |
| Phone Number  | Disabled Textbox | User Profile | 3   | 2      |
| Email         | Text Input       | User Profile | 4   | 2      |
| Ask SwipeAI   | Search Input     | Header       | 1   | 5      |

---

# 9. UI Observations

## Missing Labels

None. Every editable field has a visible label.

---

## Inconsistent Spacing

* The vertical spacing between the **Email verification notice** and the **Connect with Google** button is tighter than the spacing between the main form rows.

---

## Alignment Issues

* The upload area is horizontally centered relative to the form inputs, while the labels are left-aligned. This creates a slight asymmetry but appears intentional.

---

## Duplicate Fields

None.

---

## Disabled Controls

* **Phone Number** field appears disabled/read-only with a grey background.

---

## Read-only Fields

* Phone Number: **9114949151**

---

## Required Fields

* **Name** (indicated by a red asterisk `*`).

---

## Optional Fields

* Email (no required indicator shown).
* Profile Image (no required indicator shown).

---

## Notable UI/UX Patterns

* Two-column label/value form layout with labels on the left and controls on the right.
* Profile image upload uses a large drag-and-click style tile for discoverability.
* Email verification is surfaced inline immediately below the email field, encouraging account completion.
* Third-party authentication is integrated via a prominent **Connect with Google** button.
* Account maintenance actions are grouped into a separate **Request Something?** section.
* High-risk actions are isolated under a clearly labeled **Danger Zone**, with destructive links styled in red and an explanatory note about processing time.
* Consistent use of whitespace and section separation improves readability.
* Persistent floating WhatsApp support button is available in the bottom-right corner.




# UI Analysis — POS (Swipe)

---

# 1. Page Overview

## Page Title

**POS - Swipe**

**Application/Page Name (Visible):** **EInvoices**

**Module:** **BILLING**

---

## Purpose of the Page

This page is the Point of Sale (POS) billing interface used to create invoices quickly by scanning/searching products, managing cart items, applying discounts, calculating totals, and completing checkout.

Users can:

* Create a POS invoice
* Select warehouse
* Select price list
* Search or scan products
* Add products manually
* Modify quantity
* Apply product discounts
* Apply invoice-wide discount
* View calculated tax
* Print invoice
* Save cart
* Checkout
* Access saved carts

---

## Total Number of Sections / Cards / Forms

| Component                 | Count |
| ------------------------- | ----: |
| Top Navigation Header     |     1 |
| POS Header Section        |     1 |
| Billing Information Panel |     1 |
| Action Button Toolbar     |     1 |
| Product Entry Form        |     1 |
| Product Items Table       |     1 |
| Invoice Summary Card      |     1 |
| Saved Cart Control        |     1 |
| Upgrade Banner            |     1 |
| Payment Methods Footer    |     1 |
| Floating Support Button   |     1 |

---

# 2. Section-wise Analysis

---

# Section 1 — Global Header

Located at the top.

## Row 1 (11 Columns)

| Column | Component          | Type                 |
| ------ | ------------------ | -------------------- |
| 1      | Swipe Logo         | Logo                 |
| 2      | Company Avatar     | Avatar               |
| 3      | EInvoices          | Company Name         |
| 4      | Change Company     | Text Link            |
| 5      | Create an expense. | Search / Command Bar |
| 6      | ctrl+k             | Shortcut Hint        |
| 7      | Chat Bubble Icon   | Icon Button          |
| 8      | Lightning Icon     | Icon Button          |
| 9      | Notification Bell  | Icon Button          |
| 10     | Announcement Icon  | Icon Button          |
| 11     | User Profile Icon  | User Menu            |

---

# Section 2 — Promotional Banner

Located below header.

### Row 1

| Column | Content                |
| ------ | ---------------------- |
| 1      | New Fast POS available |
| 2      | Try New UI             |

Type

Promotional CTA Banner

---

# Section 3 — POS Header

Contains billing metadata.

## Row 1

Back Button

**← Back**

Type

Navigation Button

---

## Row 2

Heading

**EInvoices**

Badge

**BILLING**

---

## Row 3 (2 Columns)

### Column 1

Label

**Warehouse:**

Default Value

**Shop location**

Field Type

Dropdown

---

### Column 2

Label

**Price List:**

Value

**Change Price List**

Field Type

Dropdown

---

# Section 4 — Action Toolbar

## Row 1 (4 Columns)

| Column | Button    |
| ------ | --------- |
| 1      | Discard   |
| 2      | Save Cart |
| 3      | Print     |
| 4      | Checkout  |

---

### Column 1

Text

**Discard**

Type

Danger Button

---

### Column 2

Text

**Save Cart**

Type

Secondary Button

---

### Column 3

Text

**Print**

Type

Primary Button

---

### Column 4

Text

**Checkout**

Type

Success Button

Contains

Arrow Icon

---

# Section 5 — Product Entry

---

## Row 1 (4 Columns)

### Column 1

Label

**Product Name**

Additional Link

**Add New Product?**

---

### Column 2

Label

**Quantity**

---

### Column 3

Empty spacing

---

### Column 4

Saved Cart Area

Button

**Saved Carts**

Dropdown

---

## Row 2 (3 Columns)

### Column 1

Field

Search Product

Type

Search Textbox

Placeholder

**Search or Scan Barcode for Products**

---

### Column 2

Field

Quantity

Type

Number Input

Placeholder

**Quantity**

---

### Column 3

Button

**Add Item**

Type

Primary Button

Contains

Arrow Icon

---

# Section 6 — Product Table

---

## Table Title

Not explicitly shown

Acts as invoice item table.

---

## Column Headers

1. Item
2. Quantity
3. Price
4. Discount %
5. Discount Cash
6. Net Amount
7. Action

---

## Row 1

### Item

**service now**

Subtext

**Avl qty:100**

---

### Quantity

Input

Default

**1**

---

### Unit

Dropdown

Default

**PCS**

---

### Price

Textbox

Default

**177**

Appears disabled/read-only.

---

### Discount %

Textbox

Default

**0**

---

### Discount Cash

Textbox

Default

**0**

---

### Net Amount

₹177.00

Read-only calculated value.

---

### Action

Delete Icon

---

# Section 7 — Invoice Discount

Located right side.

## Row 1

Label

**All Products Discount (%)**

Field Type

Textbox

Default

**0**

---

# Section 8 — Invoice Summary

Summary Card

---

### Row 1

**Total Items:**

**1**

---

### Row 2

**Total Tax:**

**₹27.00**

---

### Row 3

**Total Amount:**

**₹177.00**

---

# Section 9 — Payment Footer

Contains accepted payment methods.

Visible Logos

* UPI
* GPay
* PhonePe
* Paytm
* RuPay
* VISA
* Mastercard

---

# 3. Buttons & Actions

| Button           | Type            | Position            | Alignment |
| ---------------- | --------------- | ------------------- | --------- |
| Back             | Navigation      | Top Left            | Left      |
| Discard          | Danger          | Toolbar             | Left      |
| Save Cart        | Secondary       | Toolbar             | Left      |
| Print            | Primary         | Toolbar             | Left      |
| Checkout         | Success         | Toolbar             | Left      |
| Add Item         | Primary         | Product Entry       | Left      |
| Add New Product? | Text Link       | Beside Product Name | Left      |
| Saved Carts      | Dropdown Button | Top Right           | Right     |
| Try New UI       | CTA             | Banner              | Right     |
| Delete Item      | Icon            | Table Row           | Right     |

---

# 4. Tables

## Invoice Items Table

### Column Headers

* Item
* Quantity
* Price
* Discount %
* Discount Cash
* Net Amount
* Action

---

### Available Actions

* Edit quantity
* Change unit
* Change discount
* Delete row

---

### Search Box

Yes

**Search or Scan Barcode for Products**

---

### Filters

None visible

---

### Pagination

None

---

### Bulk Actions

None

---

### Sorting

None visible

---

### Row Selection

None

---

### Status Badges

None

---

# 5. Navigation Elements

## Header

* Swipe Logo
* Company
* Change Company
* Create an expense.
* ctrl+k
* Chat
* Lightning
* Notifications
* Announcement
* User Menu

---

## Page Navigation

* Back
* Warehouse Dropdown
* Price List Dropdown
* Saved Carts Dropdown

---

# 6. Cards, Panels & Components

## Cards

* Promotional Banner
* Invoice Summary Card
* Product Table Card

---

## Components

* Search Input
* Number Input
* Dropdown
* Table
* Summary Panel
* Buttons
* Floating Chat Button
* Payment Logo Strip

---

## Badges

* BILLING

---

## Alerts

None

---

## Progress Bars

None

---

## File Upload

None

---

## Rich Text Editors

None

---

## Floating Component

Blue floating support/chat button (bottom-right)

---

# 7. Layout Structure

```
┌────────────────────────────────────────────────────────────────────────────┐
│ Header                                                                     │
├────────────────────────────────────────────────────────────────────────────┤
│ Upgrade Banner                                          Try New UI         │
├────────────────────────────────────────────────────────────────────────────┤
│ ← Back                                                                    │
│ EInvoices   BILLING                                                       │
│ Warehouse ▼                                                               │
│ Price List ▼                                                              │
├────────────────────────────────────────────────────────────────────────────┤
│ [Discard] [Save Cart] [Print] [Checkout]                 [Saved Carts ▼]  │
├────────────────────────────────────────────────────────────────────────────┤
│ Product Name           Quantity                                            │
│ [Search Barcode________________] [Quantity] [Add Item]                    │
├───────────────────────────────────────────────┬────────────────────────────┤
│ Item Table                                    │ All Products Discount (%)  │
│                                               │ [0]                        │
│ service now                                   │                            │
│ Qty | PCS | Price | Discount | Net | Delete   │ Summary                    │
│                                               │ Total Items : 1            │
│                                               │ Total Tax : ₹27.00         │
│                                               │ Total Amount : ₹177.00     │
├───────────────────────────────────────────────┴────────────────────────────┤
│ Payment Logos (UPI, GPay, PhonePe, Paytm, RuPay, VISA, Mastercard)         │
└────────────────────────────────────────────────────────────────────────────┘
```

---

# 8. Complete Field Inventory

| Label                     | Field Type        | Section          | Row | Column |
| ------------------------- | ----------------- | ---------------- | --- | ------ |
| Warehouse                 | Dropdown          | POS Header       | 3   | 1      |
| Price List                | Dropdown          | POS Header       | 3   | 2      |
| Product Name              | Search Input      | Product Entry    | 2   | 1      |
| Quantity                  | Number Input      | Product Entry    | 2   | 2      |
| Quantity                  | Number Input      | Product Table    | 1   | 2      |
| Unit (PCS)                | Dropdown          | Product Table    | 1   | 2      |
| Price                     | Read-only Textbox | Product Table    | 1   | 3      |
| Discount %                | Number Input      | Product Table    | 1   | 4      |
| Discount Cash             | Number Input      | Product Table    | 1   | 5      |
| All Products Discount (%) | Number Input      | Invoice Discount | 1   | 1      |

---

# 9. UI Observations

## Missing Labels

* The search box uses the label **Product Name**, but the field itself relies on placeholder text rather than an inline label.
* The **Unit (PCS)** dropdown has no dedicated header; it is visually grouped under the Quantity column.

---

## Inconsistent Spacing

* There is a large unused whitespace between the action toolbar and the invoice summary panel on wide screens.
* The right summary card appears vertically lower than the product table header.

---

## Alignment Issues

* The invoice summary card is not aligned with the top edge of the product table.
* The **Saved Carts** control is visually detached from the main action toolbar.

---

## Duplicate Fields

* Quantity appears in both the product entry form and within each invoice row, which is expected behavior for adding items versus editing line items.

---

## Disabled Controls

* The **Price** field (`177`) appears disabled or read-only.
* The **Net Amount** (`₹177.00`) is a calculated read-only value.

---

## Read-only Fields

* Net Amount
* Price (appears non-editable)

---

## Required Indicators

No required field indicators (`*`) are visible.

---

## Placeholder Text

* **Search or Scan Barcode for Products**
* **Quantity**

---

## Default Values

* Warehouse: **Shop location**
* Quantity (line item): **1**
* Unit: **PCS**
* Price: **177**
* Discount %: **0**
* Discount Cash: **0**
* All Products Discount (%): **0**
* Total Items: **1**
* Total Tax: **₹27.00**
* Total Amount: **₹177.00**

---

## Notable UI/UX Patterns

* The page uses a classic POS workflow with a quick-add product search followed by inline editable invoice rows.
* Action buttons are color-coded for intent: red (Discard), neutral (Save Cart), blue (Print), and green (Checkout), aiding quick recognition.
* The invoice summary is fixed in a dedicated side panel for continuous visibility during billing.
* Accepted payment method logos reinforce supported payment options at checkout.
* A promotional **Try New UI** banner suggests an alternate POS interface while keeping the current workflow accessible.
* The interface is optimized for keyboard and barcode scanner usage through a prominent search field and minimal navigation friction.


# UI Analysis — POS Checkout Modal (Displayed after clicking **Checkout**)

---

# 1. Page Overview

## Page Title

**Checkout**

(Modal dialog displayed over the POS Billing page)

---

## Purpose of the Page

This modal is used to complete a POS sale after products have been added to the cart. It allows the cashier to:

* Select or search a customer
* Apply invoice discounts
* Apply coupons
* Configure payment options
* Enable/disable QR code
* Choose payment mode
* Enter payment amount
* Review the invoice preview
* Review taxes
* Review subtotal and total
* View cash tendered and change
* Enter invoice instructions
* Save and print the invoice
* Save and create a new invoice

---

## Total Sections / Cards / Forms

| Component                     |                 Count |
| ----------------------------- | --------------------: |
| Checkout Modal                |                     1 |
| Header Toolbar                |                     1 |
| Customer Information Section  |                     1 |
| Discount Section              |                     1 |
| Payment Configuration Section |                     1 |
| Receipt Preview Panel         |                     1 |
| Invoice Summary Section       |                     1 |
| Instructions Area             | 1 (partially visible) |
| Action Buttons                |                     3 |
| Close Button                  |                     1 |

---

# 2. Section-wise Analysis

---

# Section 1 — Modal Header

Located at the top of the popup.

### Row 1 (4 Columns)

| Column | Component    | Type              |
| ------ | ------------ | ----------------- |
| 1      | Checkout     | Heading           |
| 2      | Save & New   | Primary Button    |
| 3      | Save & Print | Primary Button    |
| 4      | ✕            | Close Icon Button |

---

# Section 2 — Customer Information

---

### Row 1 (2 Columns)

#### Column 1

**Search Customer or Enter Mobile**

Field Type

Search / Text Input

Placeholder

**Search Customer or Enter Mobile**

Default Value

Empty

---

#### Column 2

**Customer Name (Optional)**

Field Type

Text Input

Placeholder

**Customer Name (Optional)**

Default Value

Empty

---

# Section 3 — Discount Section

---

### Row 1 (3 Columns)

### Column 1

Label

**Discount (%) (Optional)**

Field Type

Number Input

Default

**0**

---

### Column 2

Label

**Discount (₹) (Optional)**

Field Type

Number Input

Default

**0**

---

### Column 3

Button

**Use Coupons**

Type

Primary Button

---

# Section 4 — Payment Options

---

### Row 1 (4 Columns)

#### Column 1

**Fully Paid?**

Field Type

Checkbox

Default

Checked

---

#### Column 2

**Show QR Code?**

Field Type

Checkbox

Default

Checked

---

#### Column 3

Empty

---

#### Column 4

Empty

---

### Row 2 (2 Columns)

#### Column 1

Heading

**Mode Of Payment :**

---

#### Column 2

Checkbox

**Multi**

Unchecked

---

### Row 3 (3 Columns)

#### Column 1

Radio Button

**Cash**

Selected

---

#### Column 2

Radio Button

**Card**

Not Selected

---

#### Column 3

Radio Button

**UPI**

Not Selected

---

### Row 4 (1 Column)

Payment Amount

Field Type

Number Input

Default Value

**1227**

---

# Section 5 — Invoice Preview / Receipt

A receipt-style preview showing bill details.

---

### Header

**Item Name**

**Qty × Price**

**Amount**

---

### Item 1

Product

**lizol 250ml.botle**

Additional Information

**[HSN : 8517]**

Quantity

**5.000 (UNT)**

Price

**210.00**

Amount

**1050.00**

Taxes

* CGST 20% 150.00
* SGST 20% 150.00

---

### Item 2

Product

**service now**

Additional Information

**[HSN : 8517]**

Quantity

**1 × 177.00**

Amount

**177.00**

Taxes

* CGST 9% 13.50
* SGST 9% 13.50

---

### Items Summary

**Items/Qty : 2 / 6.0**

---

# Section 6 — Billing Summary

---

### Row 1

**Subtotal:**

₹1227.00

---

### Row 2

**Total Amount:**

₹1227.00

---

### Row 3

**Tendered Cash:**

1227

---

### Row 4

**Change:**

0.00

---

# Section 7 — Instructions

Visible only partially.

### Row 1

Label

**Instructions**

Field Type

Textarea (partially visible)

Default

Empty

---

# 3. Buttons & Actions

| Button       | Type    | Position         | Alignment |
| ------------ | ------- | ---------------- | --------- |
| Save & New   | Primary | Header           | Left      |
| Save & Print | Primary | Header           | Left      |
| Use Coupons  | Primary | Discount Section | Right     |
| Close (✕)    | Icon    | Top Right        | Right     |

---

# 4. Tables

## Receipt Preview Table

### Column Headers

* Item Name
* Qty × Price
* Amount

### Rows

1. lizol 250ml.botle
2. service now

### Available Actions

None

### Search

None

### Filters

None

### Pagination

None

### Bulk Actions

None

### Sorting

None

### Row Selection

None

### Status Badges

None

---

# 5. Navigation Elements

### Modal Header

* Checkout
* Save & New
* Save & Print
* Close (✕)

No breadcrumbs or sidebar navigation are present within the modal.

---

# 6. Cards, Panels & Components

### Cards

* Checkout Modal Card
* Receipt Preview Panel
* Billing Summary Area

### Components

* Text Inputs
* Number Inputs
* Checkbox Controls
* Radio Buttons
* Coupon Button
* Receipt Preview
* Textarea (Instructions)
* Close Icon

### Alerts

None

### Badges

None

### Chips

None

### Tooltips

None visible

### Progress Bars

None

### File Upload Areas

None

### Rich Text Editors

None

### Custom Components

* Receipt preview rendered in thermal-bill style
* Live invoice summary

---

# 7. Layout Structure

```
┌────────────────────────────────────────────────────────────────────────────┐
│ Checkout                     [Save & New] [Save & Print]             [✕]  │
├────────────────────────────────────────────────────────────────────────────┤
│ Search Customer or Enter Mobile │ Customer Name (Optional)                │
├────────────────────────────────────────────────────────────────────────────┤
│ Discount (%) │ Discount (₹) │                [Use Coupons]                │
├────────────────────────────────────────────────────────────────────────────┤
│ ☑ Fully Paid?       ☑ Show QR Code?                                      │
│ Mode Of Payment :   ☐ Multi                                               │
│ ◉ Cash   ○ Card   ○ UPI                                                   │
│ [1227_____________________________________________]                       │
├────────────────────────────────────────────────────────────────────────────┤
│ Item Name                                  Qty × Price           Amount   │
│ ------------------------------------------------------------------------  │
│ lizol 250ml.botle [HSN : 8517]             5.000 × 210.00       1050.00   │
│ CGST 20% 150.00                         SGST 20% 150.00                  │
│ service now [HSN : 8517]                   1 × 177.00          177.00     │
│ CGST 9% 13.50                          SGST 9% 13.50                     │
│ ------------------------------------------------------------------------  │
│ Items/Qty : 2 / 6.0                                                      │
├────────────────────────────────────────────────────────────────────────────┤
│ Subtotal :                                   ₹1227.00                     │
│ Total Amount :                               ₹1227.00                     │
│ Tendered Cash :                              1227                         │
│ Change :                                     0.00                         │
├────────────────────────────────────────────────────────────────────────────┤
│ Instructions                                                         │
│ [_______________________________________________________________]     │
└────────────────────────────────────────────────────────────────────────────┘
```

---

# 8. Complete Field Inventory

| Label                           | Field Type        | Section              | Row | Column |
| ------------------------------- | ----------------- | -------------------- | --: | -----: |
| Search Customer or Enter Mobile | Search Text Input | Customer Information |   1 |      1 |
| Customer Name (Optional)        | Text Input        | Customer Information |   1 |      2 |
| Discount (%) (Optional)         | Number Input      | Discount             |   1 |      1 |
| Discount (₹) (Optional)         | Number Input      | Discount             |   1 |      2 |
| Fully Paid?                     | Checkbox          | Payment Options      |   1 |      1 |
| Show QR Code?                   | Checkbox          | Payment Options      |   1 |      2 |
| Multi                           | Checkbox          | Payment Options      |   2 |      2 |
| Cash                            | Radio Button      | Payment Options      |   3 |      1 |
| Card                            | Radio Button      | Payment Options      |   3 |      2 |
| UPI                             | Radio Button      | Payment Options      |   3 |      3 |
| Payment Amount                  | Number Input      | Payment Options      |   4 |      1 |
| Instructions                    | Textarea          | Instructions         |   1 |      1 |

---

# 9. UI Observations

### Missing Labels

* The payment amount input (`1227`) does not have a visible label above it.

### Inconsistent Spacing

* The receipt preview occupies most of the modal height, pushing the **Instructions** section below the fold.
* There is more vertical spacing between the discount section and payment options than between other sections.

### Alignment Issues

* The **Use Coupons** button is aligned independently rather than with the discount inputs.
* The receipt preview uses receipt-style alignment, which differs from the rest of the form's grid.

### Duplicate Fields

* None visible.

### Disabled Controls

* None visibly disabled.

### Read-only Fields

* Receipt preview values (items, taxes, totals) appear read-only and auto-generated.

### Required / Optional Indicators

Visible:

* **Customer Name (Optional)**
* **Discount (%) (Optional)**
* **Discount (₹) (Optional)**

### Placeholder Text

* **Search Customer or Enter Mobile**
* **Customer Name (Optional)**

### Default Values

* Discount (%): **0**
* Discount (₹): **0**
* Fully Paid?: **Checked**
* Show QR Code?: **Checked**
* Cash: **Selected**
* Payment Amount: **1227**
* Subtotal: **₹1227.00**
* Total Amount: **₹1227.00**
* Tendered Cash: **1227**
* Change: **0.00**

### Notable UI/UX Patterns

* The checkout workflow combines customer selection, discounts, payment configuration, and receipt preview into a single modal, reducing navigation.
* Real-time receipt and tax calculation provide immediate feedback before completing the transaction.
* Payment mode is simplified with radio buttons (Cash, Card, UPI) and an optional **Multi** payment mode.
* Separate **Save & New** and **Save & Print** actions support high-volume retail workflows.
* The thermal receipt preview closely matches the printed invoice layout, allowing users to verify calculations before finalizing the sale.



# UI Analysis — Print Dialog (Displayed after clicking **Print**)

---

# 1. Page Overview

## Page Title

**Print**

(Browser Print Preview Dialog)

---

## Purpose of the Page

This dialog is the browser's native print preview interface, opened after selecting **Print** in the POS checkout process. It allows the user to:

* Preview the invoice/receipt
* Select printer destination
* Configure page settings
* Choose orientation
* Select color mode
* Access additional print settings
* Print the invoice
* Cancel printing

The left side displays the printable invoice preview, while the right side contains print configuration controls.

---

## Total Number of Sections / Cards / Forms

| Component                  | Count |
| -------------------------- | ----: |
| Print Preview Window       |     1 |
| Receipt Preview Panel      |     1 |
| Print Settings Panel       |     1 |
| Printer Configuration Form |     1 |
| Action Button Area         |     1 |
| More Settings Accordion    |     1 |

---

# 2. Section-wise Analysis

---

# Section 1 — Print Dialog Header

Located at the top of the right settings panel.

---

### Row 1 (2 Columns)

| Column | Component        | Type              |
| ------ | ---------------- | ----------------- |
| 1      | Print            | Heading           |
| 2      | 1 sheet of paper | Information Label |

---

# Section 2 — Printer Configuration

Contains all print configuration controls.

---

## Row 1 (1 Column)

### Destination

Label

**Destination**

Field Type

Dropdown

Default Value

**Microsoft Print to PDF**

Contains Printer Icon.

---

## Row 2 (1 Column)

### Pages

Label

**Pages**

Field Type

Dropdown

Default

**All**

---

## Row 3 (1 Column)

### Layout

Label

**Layout**

Field Type

Dropdown

Default

**Portrait**

---

## Row 4 (1 Column)

### Color

Label

**Color**

Field Type

Dropdown

Default

**Color**

---

## Row 5 (1 Column)

### More settings

Field Type

Expandable Accordion

Collapsed

---

# Section 3 — Receipt Preview

Located on the left.

This is a live preview of the printable receipt.

---

## Receipt Header

Visible Logo

**ROMAN FILMS**

---

Business Name

**EINVOICES**

---

Business Address

```
5 TTC INDUSTRIAL AREA, BUILDING 10A,
RELIANCE CORPORATE PARK
THANE BELAPUR ROAD,
GHANSOLI,
NAVI MUMBAI
BELLARY,
583101
```

---

GST Number

**GSTIN : 29AABCT1332L000**

---

Phone

**PHONE : 9999999999**

---

# Invoice Information

### Row 1

Payment Mode

**PAYMENT MODE : CASH**

Date

**DATE : 21-07-2026**

---

### Row 2

Bill Number

**BILL NO : 1-594**

---

# Receipt Item Table

---

### Column Headers

* ITEM NAME
* QTY × PRICE
* AMOUNT

---

## Product Row 1

Item

**LIZOL 250ML.BOTLE**

HSN

**[HSN : 8517]**

Quantity

**5.000 (UNT)**

Price

**210.00**

Amount

**1050.00**

---

Taxes

CGST 20%

150.00

SGST 20%

150.00

---

## Product Row 2

Item

**SERVICE NOW**

HSN

**[HSN : 8517]**

Quantity

**1 × 177.00**

Amount

**177.00**

Taxes

CGST 9%

13.50

SGST 9%

13.50

---

Items Summary

**ITEMS/QTY : 2 / 6.0**

---

# Financial Summary

---

Subtotal

**₹1227.00**

---

Total Amount

**₹1227.00**

---

CGST

**₹163.50**

---

SGST

**₹163.50**

---

Tendered Cash

**1227**

---

Change

**0.00**

---

Footer

**THANK YOU VISIT AGAIN!**

---

# Section 4 — Bottom Actions

---

### Row 1 (2 Columns)

#### Column 1

Button

**Print**

Primary Button

---

#### Column 2

Button

**Cancel**

Secondary Button

---

# 3. Buttons & Actions

| Button               | Type      | Position     | Alignment |
| -------------------- | --------- | ------------ | --------- |
| Print                | Primary   | Bottom Right | Right     |
| Cancel               | Secondary | Bottom Right | Right     |
| Destination Dropdown | Dropdown  | Right Panel  | Left      |
| Pages Dropdown       | Dropdown  | Right Panel  | Left      |
| Layout Dropdown      | Dropdown  | Right Panel  | Left      |
| Color Dropdown       | Dropdown  | Right Panel  | Left      |
| More settings        | Accordion | Right Panel  | Left      |

---

# 4. Tables

## Receipt Item Table

### Table Title

None

---

### Column Headers

* ITEM NAME
* QTY × PRICE
* AMOUNT

---

### Rows

1. LIZOL 250ML.BOTLE
2. SERVICE NOW

---

### Available Actions

None

---

### Search

None

---

### Filters

None

---

### Pagination

None

---

### Bulk Actions

None

---

### Sorting

None

---

### Row Selection

None

---

### Status Badges

None

---

# 5. Navigation Elements

## Print Dialog

No breadcrumbs.

No tabs.

No sidebar.

Navigation elements include:

* Destination dropdown
* Pages dropdown
* Layout dropdown
* Color dropdown
* More settings accordion

---

# 6. Cards, Panels & Components

## Cards

* Print Preview Panel
* Print Settings Panel

---

## Components

* Receipt Preview
* Dropdown Controls
* Accordion
* Primary Button
* Secondary Button
* Scrollbars (Preview Area)

---

## Accordions

**More settings**

Collapsed.

---

## Modals

Browser Print Dialog

---

## Alerts

None

---

## Badges

None

---

## Chips

None

---

## Tooltips

None visible.

---

## Progress Bars

None.

---

## File Upload Areas

None.

---

## Rich Text Editors

None.

---

## Custom Components

* Thermal receipt preview
* Live print rendering

---

# 7. Layout Structure

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                         PRINT DIALOG                                                 │
├───────────────────────────────────────────────┬─────────────────────────────────────────────────────┤
│                                               │ Print                           1 sheet of paper    │
│ Receipt Preview                               ├─────────────────────────────────────────────────────┤
│                                               │ Destination                     [Microsoft Print ▼] │
│ ROMAN FILMS                                   ├─────────────────────────────────────────────────────┤
│ EINVOICES                                     │ Pages                           [All ▼]             │
│ Address                                       ├─────────────────────────────────────────────────────┤
│ GSTIN                                         │ Layout                          [Portrait ▼]        │
│ Phone                                         ├─────────────────────────────────────────────────────┤
│-------------------------------------------    │ Color                           [Color ▼]           │
│ PAYMENT MODE : CASH                           ├─────────────────────────────────────────────────────┤
│ DATE : 21-07-2026                             │ More settings                   ▼                    │
│ BILL NO : 1-594                               │                                                     │
│-------------------------------------------    │                                                     │
│ ITEM NAME                                     │                                                     │
│ QTY × PRICE                                  │                                                     │
│ AMOUNT                                       │                                                     │
│-------------------------------------------    │                                                     │
│ LIZOL 250ML.BOTLE                            │                                                     │
│ SERVICE NOW                                  │                                                     │
│-------------------------------------------    │                                                     │
│ Subtotal                                     │                                                     │
│ Total Amount                                 │                                                     │
│ CGST                                         │                                                     │
│ SGST                                         │                                                     │
│ Tendered Cash                                │                                                     │
│ Change                                       │                                                     │
│ THANK YOU VISIT AGAIN!                       │                                                     │
│                                               ├─────────────────────────────────────────────────────┤
│                                               │                           [Print] [Cancel]          │
└───────────────────────────────────────────────┴─────────────────────────────────────────────────────┘
```

---

# 8. Complete Field Inventory

| Exact Label   | Field Type | Section               | Row | Column |
| ------------- | ---------- | --------------------- | --: | -----: |
| Destination   | Dropdown   | Printer Configuration |   1 |      1 |
| Pages         | Dropdown   | Printer Configuration |   2 |      1 |
| Layout        | Dropdown   | Printer Configuration |   3 |      1 |
| Color         | Dropdown   | Printer Configuration |   4 |      1 |
| More settings | Accordion  | Printer Configuration |   5 |      1 |

---

# 9. UI Observations

## Missing Labels

* The receipt preview does not have a visible title such as "Preview"; its purpose is implied by the layout.
* The scrollbars in the preview pane are functional but unlabeled.

---

## Inconsistent Spacing

* The preview panel occupies significantly more horizontal space than the settings panel, reflecting a document-first layout.
* There is substantial whitespace below the **More settings** accordion when it is collapsed.

---

## Alignment Issues

* None apparent. Controls are consistently aligned in a single-column form on the right.
* Receipt content is centered within the preview page and follows thermal receipt formatting.

---

## Duplicate Fields

* None.

---

## Disabled Controls

* No disabled controls are visible.
* The receipt preview itself is read-only.

---

## Read-only Fields

All content within the receipt preview is read-only, including:

* Business information
* Payment mode
* Date
* Bill number
* Item details
* Taxes
* Totals
* Footer message

---

## Default Values

* Destination: **Microsoft Print to PDF**
* Pages: **All**
* Layout: **Portrait**
* Color: **Color**
* Sheet Count: **1 sheet of paper**

---

## Notable UI/UX Patterns

* The print dialog follows a two-pane layout: a document preview on the left and configuration controls on the right, enabling live preview while adjusting settings.
* The receipt is formatted as a narrow thermal POS slip, preserving the appearance expected from receipt printers even when printing to PDF.
* The **Print** action is visually emphasized with a primary blue button, while **Cancel** is styled as a secondary action.
* Print settings are intentionally minimal, with advanced options hidden under the **More settings** accordion to reduce cognitive load.
* Vertical and horizontal scrollbars within the preview indicate that the entire receipt can be inspected before printing.
