# Deploying Frontend to Render

This project is configured for deployment as a static site on Render.

## Deployment Steps

1. Push your code to your Git repository (GitHub, GitLab, etc.).

2. Log in to your Render account and create a new **Static Site**.

3. Connect your repository and select the `frontend` directory as the root.

4. Use the following settings in Render:

- **Build Command:** `npm run build`
- **Publish Directory:** `dist`

5. Render will use the `render.yaml` file in the `frontend` directory to configure the deployment automatically.

6. After deployment, your site will be live at the Render-provided URL.

## Local Preview

To preview the production build locally:

```bash
cd frontend
npm install
npm run build
npm run preview
```

This will serve the built site on a local HTTP server.

## Notes

- The `.nojekyll` file is included to prevent GitHub Pages or other static hosts from ignoring files starting with underscores.

- Ensure your environment variables (if any) are configured in Render's dashboard.
