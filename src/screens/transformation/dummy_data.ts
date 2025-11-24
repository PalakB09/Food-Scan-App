type TransformationData = {
  date: string;
  url: string;
  weight: number;
};

export const DUMMY_TRANSFORMATION_DATA: TransformationData[] = [
  {
    date: "2024-12-31",
    url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    weight: 100,
  },
  {
    date: "2025-03-15",
    url: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1",
    weight: 93,
  },
  {
    date: "2025-06-14",
    url: "https://images.unsplash.com/photo-1554284126-aa88f22d8b74",
    weight: 82,
  },
  {
    date: "2025-08-11",
    url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    weight: 75,
  },
  {
    date: "2025-09-12",
    url: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1",
    weight: 68,
  },
  {
    date: "2025-12-11",
    url: "https://images.unsplash.com/photo-1554284126-aa88f22d8b74",
    weight: 60,
  },
] as const;
