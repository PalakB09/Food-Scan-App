import { Datum } from "@/src/query/hooks/useFoodSearch";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import Image from "../Image";
import { Image as RNImage } from "react-native";

import EnergyIcon from "@/src/assets/icons/energy.png";
import CarbsIcon from "@/src/assets/icons/carb.png";
import FatIcon from "@/src/assets/icons/fat.png";
import ProteinIcon from "@/src/assets/icons/protein.png";
import { IconColors } from "@/src/constants/Colors";

const FoodListItem = ({ food }: { food: Datum }) => {
  return (
    <Pressable
      onPress={() => {
        router.push({
          pathname: "/foodDetail",
          params: {
            foodId: food.id,
          },
        });
      }}
      className="w-full bg-white p-2 py-1 dark:bg-black"
    >
      <View className="flex-1 rounded-xl bg-gray-100 p-2 dark:bg-gray-800">

        {/* IMAGE + TITLE */}
        <View className="mb-2 flex-row">
          <Image
            source={{ uri: food.image }}
            style={{ width: 60, height: 60, borderRadius: 4 }}
          />
          <View className="justify-center pl-4 pt-1">
            <Text
              numberOfLines={1}
              className="mb-1 ml-1 text-xl font-semibold color-black dark:color-white"
            >
              {food.name}
            </Text>
          </View>
        </View>

        <View className="border-b border-gray-200 dark:border-gray-700" />

        {/* NUTRITION ROW */}
        <View className="mt-2 flex-row justify-between px-2">
          <View className="flex-row items-center">
            <RNImage
              source={EnergyIcon}
              className="mr-1 h-4 w-4"
              tintColor={IconColors.energy}
            />
            <Text className="text-xs color-black dark:color-white">
              Cal:
              <Text className="text-xs font-semibold color-black dark:color-white">
                {food.energy}
              </Text>
              cal
            </Text>
          </View>

          <View className="flex-row items-center">
            <RNImage
              source={ProteinIcon}
              className="mr-1 h-4 w-4"
              tintColor={IconColors.protein}
            />
            <Text className="text-xs color-black dark:color-white">
              Protein:
              <Text className="text-xs font-semibold color-black dark:color-white">
                {food.protein}
              </Text>
              g
            </Text>
          </View>

          <View className="flex-row items-center">
            <RNImage
              source={CarbsIcon}
              className="mr-1 h-4 w-4"
              tintColor={IconColors.carbonhydrate}
            />
            <Text className="text-xs color-black dark:color-white">
              Carbs:
              <Text className="text-xs font-semibold color-black dark:color-white">
                {food.carbonhydrate}
              </Text>
              g
            </Text>
          </View>

          <View className="flex-row items-center">
            <RNImage
              source={FatIcon}
              className="mr-1 h-4 w-4"
              tintColor={IconColors.fat}
            />
            <Text className="text-xs color-black dark:color-white">
              Fat:
              <Text className="text-xs font-semibold color-black dark:color-white">
                {food.fat}
              </Text>
              g
            </Text>
          </View>
        </View>

        {/* ⬇⬇ ADD THIS BLOCK HERE ⬇⬇ */}
        {food.warning && food.warning.length > 0 && (
          <View className="bg-red-100 dark:bg-red-900 p-3 rounded-xl border border-red-400 mt-3">
            <Text className="text-red-700 dark:text-red-300 font-bold text-lg">
              ⚠ CAUTION
            </Text>

            <Text className="text-red-600 dark:text-red-200 mt-1">
              {food.warning}
            </Text>

            <Text className="text-red-500 dark:text-red-300 mt-2 italic">
              *Detected harmful or unhealthy ingredients.
            </Text>
          </View>
        )}
        {/* ⬆⬆ END OF CAUTION BLOCK ⬆⬆ */}

      </View>
    </Pressable>
  );
};

export default FoodListItem;
