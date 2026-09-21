# POSH IMPERIAL website

A static website (HTML, CSS, JavaScript). No build step, no dependencies.

## 1. Fill in your details (do this first)
Open `js/config.js` and replace the placeholder phone, WhatsApp number, email, address, hours and social links.
Everything on the site reads from that one file.

## 2. Check your brands
Open `js/brands.js`. Lines marked `VERIFY` need a spelling or description check.
Remove any brand you don't stock. Add a brand by copying one line.

## 3. Replace the images
All artwork is in `images/`. Replace a file with your own photo using the **same file name**
(or change the name in the HTML). JPG/WebP/PNG all work; if you replace an `.svg` with a `.jpg`,
update the file extension in `index.html` and `products.html`.

| File | Where it shows |
|---|---|
| `hero-before.svg`, `hero-after.svg` | Home page slider (use two photos of the same panel) |
| `cat-polish`, `cat-coatings`, `cat-wash`, `cat-microfibre`, `cat-wheels`, `cat-interior` | Home tiles and Products page |
| `logo-mark.png`, `logo-mark-white.png` | Header and footer logo |
| `og-image.jpg` | Link preview when shared on WhatsApp/social |

Tip: keep photos under ~300 KB each (resize to about 1600 px wide).

## 4. Publish on GitHub Pages
1. Create a new **public** repository on github.com (e.g. `posh-imperial`). Do not add a README there.
2. In this folder, run:
   ```
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/posh-imperial.git
   git push -u origin main
   ```
3. On GitHub: **Settings > Pages > Build and deployment > Source: Deploy from a branch**,
   choose branch `main` and folder `/ (root)`, then Save.
4. After a minute your site is live at `https://YOUR-USERNAME.github.io/posh-imperial/`.

To update later: edit files, then `git add . && git commit -m "Update" && git push`.

## 5. Custom domain (optional)
Settings > Pages > Custom domain. Then update `og:image` in each HTML file to the full address.

## Legal pages
`privacy-policy.html`, `terms.html` and `shipping-returns.html` are sensible starting drafts.
Have them reviewed by a lawyer before you rely on them, and edit to match how you really operate.
