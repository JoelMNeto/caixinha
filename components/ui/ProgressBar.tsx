import { useEffect } from "react";
import { Dimensions, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

type Props = {
  progress: number;
};

export default function ProgressBar({ progress }: Props) {
  const progressWidth = useSharedValue(0);

  useEffect(() => {
    progressWidth.value = withTiming(progress * (width - 30), {
      duration: 300,
    });
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: progressWidth.value,
    };
  });

  return (
    <View
      style={{
        height: 4,
        width: "100%",
        backgroundColor: "#eee",
      }}
    >
      <Animated.View
        style={[
          {
            height: "100%",
            backgroundColor: "#05be43",
          },
          animatedStyle,
        ]}
      />
    </View>
  );
}