## Role Assignment During Signup

**All users sign up the same way** - there's no "choose your role" during registration. Instead:

1. **Everyone starts as "Explorer"** by default
2. **During onboarding**, users indicate their intent:
   - "I want to share my travel experiences" → Auto-upgrade to Traveler
   - "I'm here to discover and get inspired" → Remains Explorer
   - Skip/unclear → Remains Explorer

## Explorer to Traveler Upgrade

**Automatic Upgrade Triggers:**
- User tries to create their first travel post → System prompts: "Upgrade to Traveler to share experiences?"
- User completes detailed profile (travel preferences, bio) → Auto-upgrade
- User creates 5+ wishlist items → Upgrade suggestion appears

**Manual Upgrade Options:**
- Button in user profile: "Become a Traveler"
- Upgrade prompts when trying restricted features
- Settings page with role upgrade option

**Activity-Based Upgrade:**
After certain engagement thresholds:
- Liked 20+ posts
- Commented on 10+ posts  
- Saved 15+ posts to collections
- Active for 2+ weeks
→ System suggests: "You seem engaged! Want to start sharing your own travels?"

## Admin Assignment

**Manual Assignment Only:**
- Existing admins promote users through admin panel
- IT/HR can create admin accounts directly in database
- No self-upgrade path to admin role

**Example Flow:**
1. New user signs up → Explorer role
2. Uses platform, engages with content
3. Decides to share first trip → Clicks "Create Post" → "Upgrade to Traveler?" → Yes → Now Traveler
4. Or admin notices active user → Manually promotes to Traveler/Admin
