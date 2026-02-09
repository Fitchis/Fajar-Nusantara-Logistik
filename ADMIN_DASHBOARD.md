# Admin Dashboard Documentation

## Overview

The admin dashboard is a complete management system for Fajar Nusantara Logistik website content. It features a collapsible sidebar, multi-page layout, and manages testimonials, gallery images, contact submissions, and team/client information.

## Access the Admin Dashboard

### Login
- **URL**: `http://localhost:3000/admin/login`
- **Demo Email**: `admin@fajarlogistik.com`
- **Demo Password**: `Admin@123456`

### Dashboard Home
Once logged in, you'll be redirected to: `http://localhost:3000/admin/dashboard`

## Features

### 1. Dashboard Overview
- **Location**: `/admin/dashboard`
- **Features**:
  - Quick stats showing counts for all managed items
  - Quick action shortcuts to all management pages
  - System information and status
  - Welcome message with logged-in user email

### 2. Testimonials Management
- **Location**: `/admin/testimonials`
- **Features**:
  - View all customer testimonials in a table format
  - Add new testimonials with:
    - Customer name
    - Company name
    - Star rating (1-5 stars)
    - Testimonial text
  - Edit existing testimonials
  - Delete testimonials with confirmation
  - Modal form for easy data entry

### 3. Gallery Management
- **Location**: `/admin/gallery`
- **Features**:
  - View gallery images in a grid layout
  - Upload images by providing:
    - Image title
    - Description
    - Image URL (supports external URLs)
    - Category (equipment, vehicles, team, operations, other)
  - Image preview in form
  - Edit image details
  - Delete images with confirmation
  - Category filtering and display

### 4. Contact Submissions
- **Location**: `/admin/contacts`
- **Features**:
  - View all incoming contact form submissions
  - Filter by status: All, Unread, Read
  - Mark submissions as read
  - View detailed submission information:
    - Name, Email, Phone
    - Full message content
    - Submission date/time
  - Reply via email (opens default email client)
  - Delete submissions
  - Unread message counter in header
  - Split view: List on left, details on right

### 5. Team & Clients Management
- **Location**: `/admin/team-clients`
- **Features**:
  - Manage team members and clients separately
  - Add entries with:
    - Name
    - Position/Company
    - Type (Team Member or Client)
    - Description
    - Profile image URL
  - View stats for team members and clients
  - Edit existing entries
  - Delete entries
  - Filter by type
  - Grid view with image support
  - Placeholder icons when no image provided

## Navigation

### Sidebar
- **Collapsible**: Click the collapse button (bottom right on desktop) to toggle sidebar
- **Mobile**: Hamburger menu on top left, click to toggle
- **Links**:
  - Dashboard (home icon)
  - Testimonials (message icon)
  - Gallery (images icon)
  - Contact Submissions (mail icon)
  - Team & Clients (users icon)
- **Logout**: Bottom of sidebar in red

### Mobile Responsive
- On mobile devices, sidebar appears as a hamburger drawer
- Auto-collapses on navigation
- Overlay closes on background click

## Data Storage

### Local Storage
All data is stored in browser's localStorage with the following keys:
- `adminSession` - Current admin session (email, ID)
- `fnl_testimonials` - Testimonials array
- `fnl_gallery` - Gallery images array
- `fnl_contacts` - Contact submissions array
- `fnl_team_clients` - Team and clients array

### Important Notes
- Data persists across browser sessions
- Clearing localStorage will delete all data
- Each item has:
  - Unique ID (timestamp-based)
  - Creation date
  - Full item details

## User Interface

### Design Elements
- **Color Scheme**: 
  - Brand color (teal): #219cc8
  - Dark backgrounds for sidebar: #1e293b
  - Light backgrounds for content: #ffffff
  - Accent colors for different sections

- **Icons**: Lucide React icons throughout
- **Forms**: Modal dialogs for add/edit operations
- **Tables**: Responsive tables with hover effects
- **Grid Views**: Responsive grids for gallery and team/clients

### Interactions
- **Add/Edit**: Modal form appears when clicking "Add" or "Edit" button
- **Delete**: Confirmation dialog before deletion
- **Real-time**: Changes update immediately
- **Validation**: Required fields are marked and validated

## Features by Page

### Dashboard
```
Quick Stats
├── Testimonials (count + link)
├── Gallery Items (count + link)
├── Contact Messages (count + link)
└── Team & Clients (count + link)

Quick Actions (cards linking to management pages)
System Information (status messages)
```

### Testimonials
```
Table View
├── Name
├── Company
├── Rating (star display)
├── Text (truncated)
└── Actions (Edit, Delete)

Modal Form (Add/Edit)
├── Name (text input)
├── Company (text input)
├── Rating (select 1-5)
└── Testimonial (textarea)
```

### Gallery
```
Grid View
├── Image preview
├── Title
├── Description (truncated)
├── Category badge
├── Date
└── Actions (Edit, Delete)

Modal Form (Add/Edit)
├── Title (text input)
├── Description (textarea)
├── Image URL (text input)
├── Category (select dropdown)
└── Image preview
```

### Contact Submissions
```
Split View
├── List (left side)
│   ├── Filter tabs (All, Unread, Read)
│   ├── Unread count
│   └── Submission items (clickable)
│
└── Detail (right side)
    ├── Name & timestamp
    ├── Contact info (email, phone)
    ├── Full message
    ├── Reply via Email button
    └── Delete button
```

### Team & Clients
```
Grid View
├── Filter tabs (All, Team Members, Clients)
├── Stats (Team count, Client count)
│
└── Cards
    ├── Image or placeholder
    ├── Name
    ├── Type badge
    ├── Position/Title
    ├── Description (optional)
    └── Actions (Edit, Delete)

Modal Form (Add/Edit)
├── Type (select: Team Member or Client)
├── Name (text input)
├── Position/Company (text input)
├── Description (textarea)
├── Image URL (text input)
└── Image preview
```

## Authentication

### Login System
- Email/password based authentication
- Session stored in localStorage
- Session persists across page reloads
- Automatic redirect to login if not authenticated
- Logout button clears session and returns to login

### Security Notes
- In production, use proper authentication (Supabase, NextAuth, etc.)
- Passwords should be hashed on backend
- HTTPS should be enforced
- Consider rate limiting on login attempts

## Customization

### Adding New Management Sections
1. Create storage functions in `/lib/storage.ts`
2. Create page component in `/app/admin/[section]/page.tsx`
3. Add navigation item to `/components/admin-sidebar.tsx`
4. Update dashboard stats in `/app/admin/dashboard/page.tsx`

### Changing Colors
Update `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      brand: '#YOUR_COLOR',
      'brand-dark': '#YOUR_DARK_COLOR'
    }
  }
}
```

### Modifying Forms
- Edit modal components in each management page
- Add fields to the `formData` state
- Update storage functions to include new fields

## Troubleshooting

### Session Lost
- Check browser localStorage is enabled
- Clear cache and reload if issues persist
- Re-login if session corrupted

### Images Not Loading
- Verify image URLs are correct and accessible
- CORS may block some external images
- Use placeholder URLs as fallback

### Data Not Saving
- Check browser console for errors
- Verify localStorage has space available
- Clear some old data if storage is full

### Sidebar Not Working
- Hard refresh page (Ctrl+Shift+R or Cmd+Shift+R)
- Check JavaScript is enabled
- Clear browser cache

## File Structure

```
/app/admin/
├── layout.tsx                    # Admin layout with auth provider
├── login/page.tsx               # Login page
├── dashboard/page.tsx           # Dashboard overview
├── testimonials/page.tsx        # Testimonials management
├── gallery/page.tsx             # Gallery management
├── contacts/page.tsx            # Contact submissions
└── team-clients/page.tsx        # Team & clients management

/components/
├── admin-layout.tsx             # Layout wrapper with auth check
├── admin-sidebar.tsx            # Collapsible navigation sidebar
└── admin-login.tsx              # Login form component

/providers/
└── admin-auth-provider.tsx      # Authentication context and hooks

/lib/
├── auth.ts                      # Authentication utilities
└── storage.ts                   # localStorage management functions
```

## API Routes

### POST `/api/admin/login`
- **Request**: `{ email: string, password: string }`
- **Response**: `{ id: string, email: string }`
- **Handles**: Admin authentication validation

## Next Steps

### Future Enhancements
- [ ] Connect to real database (Supabase, Neon, etc.)
- [ ] Add user role-based access control
- [ ] Implement image upload instead of URL input
- [ ] Add bulk operations (delete multiple)
- [ ] Export data to CSV
- [ ] Schedule email reminders for contacts
- [ ] Add activity logs
- [ ] Implement search and advanced filtering
- [ ] Add data backup/restore functionality

## Support

For issues or questions about the admin dashboard:
1. Check this documentation first
2. Review the code comments in component files
3. Check browser console for error messages
4. Verify all required files are present

## License

The admin dashboard is part of Fajar Nusantara Logistik website and follows the same license as the main application.
