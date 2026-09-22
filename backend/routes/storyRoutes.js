const express = require("express");
const storyData = require("../data/storyData");

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({
    ok: true,
    status: "healthy",
    service: "story-web-backend",
    timestamp: new Date().toISOString()
  });
});

router.get("/story", (req, res) => {
  res.json({
    ok: true,
    data: {
      title: storyData.title,
      author: storyData.author,
      edition: storyData.edition,
      tagline: storyData.tagline,
      status: storyData.status,
      summary: storyData.summary,
      telemetry: storyData.telemetry,
      features: storyData.features
    }
  });
});

router.get("/story/chapters", (req, res) => {
  res.json({
    ok: true,
    data: storyData.chapters
  });
});

router.get("/story/chapter/:id", (req, res) => {
  const chapterId = Number(req.params.id);
  const chapter = storyData.chapters.find((item) => item.id === chapterId);

  if (!chapter) {
    return res.status(404).json({
      ok: false,
      message: "Chapter not found"
    });
  }

  return res.json({
    ok: true,
    data: chapter
  });
});

router.get("/telemetry", (req, res) => {
  res.json({
    ok: true,
    data: storyData.telemetry
  });
});

router.get("/features", (req, res) => {
  res.json({
    ok: true,
    data: storyData.features
  });
});

module.exports = router;
