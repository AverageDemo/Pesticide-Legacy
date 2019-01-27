# Pesticide

Some things I have to fix / add:

ADD:

Dev-groups based on issue project<br />
2FA<br />
OAuth<br />
GitHub / SVN / Perforce Integration<br />
Administrator panel and settings<br />
Ability to customize site title and various other things<br />
Search features<br />
A page where you can view ALL issues (for Developers+) not just recent issues<br />
Forgot Password<br />
Protected routes (via Router, not component)<br />
Admin panel design & code clean-up<br />

FIX:

The re-rendering and pre-fetching of data

-   This will fix old issues showing for a moment on a new page as well as the loading of the home page - This will likely be done by querying the store for a specific article rather than the database. As for the home page there will be a proper loading _thing_ implemented

Fix the way recently closed issues gets populated

Touch up the category dropdown on issue submission

The fact that I didn't even use async / await because lazy. Don't cringe, this will be fixed.

Notes:

The admin panel was rushed in because I needed the functionality. This will be cleaned up a lot
