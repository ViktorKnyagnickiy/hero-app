// src/pages/HeroList.tsx
import { useEffect, useMemo, useState } from "react";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Grid,
  Stack,
  Button,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import { getHeroes } from "../api";
import type { Paginated, Hero } from "../types";

export default function HeroList() {
  const [sp] = useSearchParams();
  const page = Number(sp.get("page") || 1);

  const [data, setData] = useState<Paginated<Hero> | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setErr(null);
      try {
        const res = await getHeroes(page, 5);
        if (!cancelled) setData(res);
      } catch (e: any) {
        if (!cancelled) setErr(e?.message || "Failed to load heroes");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [page]);

  const pages = useMemo(() => data?.pages ?? 1, [data]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  if (err) return <Alert severity="error">{err}</Alert>;
  if (!data) return <Alert severity="info">Поки що немає даних.</Alert>;

  return (
    <Stack spacing={2}>
      <Typography variant="h3">Heroes</Typography>

      {/* Центруємо ряд, щоб 1–2 картки на десктопі не «липли» вліво */}
      <Grid container spacing={3} justifyContent="center">
        {data.items.map((h) => {
          const img = h.images?.[0]?.url || "/noimg.png";
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={h.id}
              /* 1 в ряд (xs), 2 (sm), 3 (md), 4 (lg) */
            >
              <Card
                elevation={2}
                sx={{
                  height: "100%",
                  maxWidth: 360,    // 👈 не даємо картці ставати «гігантською»
                  mx: "auto",
                  borderRadius: 3,
                  transition: "transform 120ms, box-shadow 120ms",
                  "&:hover": { transform: "translateY(-2px)", boxShadow: 6 },
                }}
              >
                <CardActionArea
                  component={RouterLink}
                  to={`/heroes/${h.id}`}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                  }}
                >
                  {/* Уніфіковане прев'ю: однакова пропорція для всіх зображень */}
                  <Box
                    sx={{
                      width: "100%",
                      aspectRatio: "1 / 1", // квадрат (можеш змінити на '4 / 5' як у карточок товарів)
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "white",
                      overflow: "hidden",
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                    }}
                  >
                    <Box
                      component="img"
                      src={img}
                      alt={h.nickname}
                      loading="lazy"
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain", // або "cover", якщо хочеш без білих полів
                        display: "block",
                      }}
                    />
                  </Box>

                  <CardContent sx={{ width: "100%", minHeight: 96 }}>
                    <Typography variant="h6" noWrap>
                      {h.nickname}
                    </Typography>
                    <Typography color="text.secondary" noWrap>
                      {h.realName}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography color="text.secondary">
          Page {data.page} / {pages}
        </Typography>

        <Stack direction="row" spacing={1}>
          <Pager toPage={page - 1} disabled={page <= 1}>
            Prev
          </Pager>
          <Pager toPage={page + 1} disabled={page >= pages}>
            Next
          </Pager>
        </Stack>
      </Stack>
    </Stack>
  );
}

function Pager({
  toPage,
  disabled,
  children,
}: {
  toPage: number;
  disabled?: boolean;
  children: any;
}) {
  const href = `/?page=${toPage}`;
  return disabled ? (
    <Button variant="outlined" disabled>
      {children}
    </Button>
  ) : (
    <Button variant="outlined" component={RouterLink} to={href}>
      {children}
    </Button>
  );
}
