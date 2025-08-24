// src/pages/HeroForm.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Paper,
  Typography,
  Stack,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { createHero, getHero, updateHero } from "../api";

export default function HeroForm() {
  const { id } = useParams();
  const nav = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    nickname: "",
    realName: "",
    originDescription: "",
    catchPhrase: "",
    superpowers: "", // comma separated
  });

  const [loading, setLoading] = useState<boolean>(isEdit);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!isEdit || !id) return;
      setLoading(true);
      setError(null);
      try {
        const h = await getHero(id);
        if (!cancelled) {
          setForm({
            nickname: h.nickname || "",
            realName: h.realName || "",
            originDescription: h.originDescription || "",
            catchPhrase: h.catchPhrase || "",
            superpowers:
              (h.superpowers || [])
                .map((s: any) => (typeof s === "string" ? s : s?.name))
                .filter(Boolean)
                .join(", ") || "",
          });
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Failed to load hero");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [id, isEdit]);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // простенька валідація
    if (!form.nickname.trim() || !form.realName.trim()) {
      setError("Nickname та Real name — обовʼязкові поля.");
      return;
    }

    const payload = {
      ...form,
      superpowers: form.superpowers
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      if (isEdit && id) {
        await updateHero(id, payload);
        nav(`/heroes/${id}`);
      } else {
        const h = await createHero(payload);
        nav(`/heroes/${h.id}`);
      }
    } catch (e: any) {
      setError(e?.message || "Не вдалося зберегти зміни");
    }
  };

  return (
    <Paper component="form" onSubmit={save} sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {isEdit ? "Edit Hero" : "Create Hero"}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Stack spacing={2}>
        <TextField
          label="Nickname"
          value={form.nickname}
          onChange={(e) => set("nickname", e.target.value)}
          required
          disabled={loading}
        />

        <TextField
          label="Real name"
          value={form.realName}
          onChange={(e) => set("realName", e.target.value)}
          required
          disabled={loading}
        />

        <TextField
          label="Catch phrase"
          value={form.catchPhrase}
          onChange={(e) => set("catchPhrase", e.target.value)}
          disabled={loading}
        />

        <TextField
          label="Origin description"
          value={form.originDescription}
          onChange={(e) => set("originDescription", e.target.value)}
          multiline
          minRows={4}
          required
          disabled={loading}
        />

        <TextField
          label="Superpowers (comma separated)"
          placeholder="flight, laser vision"
          value={form.superpowers}
          onChange={(e) => set("superpowers", e.target.value)}
          helperText="Приклад: flight, laser vision"
          disabled={loading}
        />

        <Stack direction="row" spacing={1} justifyContent="flex-end" sx={{ mt: 1 }}>
          <Button variant="outlined" onClick={() => nav(-1)} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={loading}>
            Save
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
