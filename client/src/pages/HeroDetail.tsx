import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Stack,
  Button,
  Box,
  Divider,
  CircularProgress,
  Alert,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { deleteHero, deleteImage, getHero, uploadImages } from "../api";
import type { Hero } from "../types";

export default function HeroDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [hero, setHero] = useState<Hero | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await getHero(id);
      setHero(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (!files.length || !id) return;
    await uploadImages(id, files);
    load();
  };

  const onDelete = async () => {
    if (!id) return;
    if (!confirm("Delete this hero?")) return;
    await deleteHero(id);
    nav("/");
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  if (!hero) {
    return <Alert severity="warning">Not found</Alert>;
  }

  const superpowers =
    (hero.superpowers || [])
      .map((s: any) => (typeof s === "string" ? s : s?.name))
      .filter(Boolean)
      .join(", ") || "—";

  return (
    <Card>
      <CardHeader
        title={<Typography variant="h4">{hero.nickname}</Typography>}
        action={
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              component={RouterLink}
              to={`/heroes/${hero.id}/edit`}
            >
              Edit
            </Button>
            <Button variant="outlined" color="error" onClick={onDelete}>
              Delete
            </Button>
          </Stack>
        }
      />

      <Divider />

      <CardContent>
        <Stack spacing={1.2} sx={{ mb: 3 }}>
          <Typography>
            <b>Real name:</b> {hero.realName || "—"}
          </Typography>
          <Typography>
            <b>Catch phrase:</b> {hero.catchPhrase || "—"}
          </Typography>
          <Typography>
            <b>Origin:</b> {hero.originDescription || "—"}
          </Typography>
          <Typography>
            <b>Superpowers:</b> {superpowers}
          </Typography>
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          alignItems={{ xs: "stretch", sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 1 }}
        >
          <Typography variant="h5">Images</Typography>

          <Button variant="outlined" component="label">
            Upload images
            <input type="file" hidden multiple onChange={onUpload} />
          </Button>
        </Stack>

        <ImageList variant="masonry" cols={3} gap={12}>
          {(hero.images || []).map((img: any) => (
            <ImageListItem key={img.id}>
              {/* ескіз */}
              <img
                src={img.url}
                alt={hero.nickname}
                style={{ width: "100%", height: "auto", borderRadius: 8 }}
                loading="lazy"
              />
              <Box mt={1} display="flex" justifyContent="flex-end">
                <Button
                  size="small"
                  color="error"
                  variant="outlined"
                  onClick={async () => {
                    await deleteImage(hero.id, img.id);
                    load();
                  }}
                >
                  Remove
                </Button>
              </Box>
            </ImageListItem>
          ))}
        </ImageList>

        {(!hero.images || hero.images.length === 0) && (
          <Alert severity="info" sx={{ mt: 2 }}>
            No images yet. Use “Upload images” to add some.
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
