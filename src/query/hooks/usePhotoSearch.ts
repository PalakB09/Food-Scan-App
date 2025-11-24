import { useQuery } from "@tanstack/react-query";
import { scanFoodWithGemini } from "@/src/utils/geminiFoodScan";

export interface GeminiFoodResult {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  warning?: string;
}

const usePhotoSearch = (image: string, onProgress: (progress: number) => void) => {
  const { data, isLoading, error } = useQuery<GeminiFoodResult>({
    queryKey: ["photoSearch", image],
    queryFn: () => scanFoodWithGemini(image),
    staleTime: 0,
  });

  return {
    result: data,
    isLoading,
    error,
  };
};

export default usePhotoSearch;
