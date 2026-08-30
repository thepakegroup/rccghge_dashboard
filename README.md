# RCCGHGE Dashboard

Legacy RCCGHGE church administration surface. The immutable image
`rccghge-dashboard:ebbb0c356d90` is Live on OCI Mari behind the Flo public
edge. This admitted Fleet checkout is the only build source.

The former Vercel/template guidance and DigitalOcean deployment path are not
production instructions. The guarded RCCGHGE/HGE post-migration release
controller is implemented; consult the Fleet manifesto and
`fleet-manifesto/evidence/2026-08-28/RCCGHGE-HGE-OCI-MIGRATION.md` before an
operational change.

## Local development

```bash
npm install
npm run dev
npm run lint
npm run build
```

Runtime configuration belongs in local ignored files or protected Fleet
secrets, never in the repository.
