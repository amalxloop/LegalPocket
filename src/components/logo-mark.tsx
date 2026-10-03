import { StyleSheet, View } from 'react-native';
import { colors } from '@/theme/colors';

function Pan({
  cx,
  armY,
  size,
  stroke,
  gold,
}: {
  cx: number;
  armY: number;
  size: number;
  stroke: number;
  gold: string;
}) {
  const panWidth = size * 0.3;
  const panHeight = size * 0.17;
  return (
    <>
      <View
        style={[
          styles.panLine,
          { width: stroke * 1.6, height: size * 0.16, backgroundColor: gold, left: cx - stroke * 0.8, top: armY },
        ]}
      />
      <View
        style={[
          styles.pan,
          {
            width: panWidth,
            height: panHeight,
            borderBottomWidth: stroke,
            borderColor: gold,
            left: cx - panWidth / 2,
            top: armY + size * 0.16,
            borderBottomLeftRadius: panWidth / 2,
            borderBottomRightRadius: panWidth / 2,
          },
        ]}
      />
    </>
  );
}

/**
 * LegalPocket brand mark — a stylised balance scale (scales of justice) drawn
 * with plain views so it scales crisply at any size without an icon font or
 * bundled raster. Colours match assets/brand/legalpocket-icon.svg.
 */
export function LogoMark({ size = 44 }: { size?: number }) {
  const gold = colors.gold;
  const stroke = Math.max(2, size * 0.042);
  const armWidth = size * 0.72;
  const armY = size * 0.35;
  const stemTop = size * 0.22;
  const stemBottom = size * 0.74;
  const baseWidth = size * 0.36;

  return (
    <View style={{ width: size, height: size }}>
      <View
        style={[
          styles.stem,
          { width: stroke, height: stemBottom - stemTop, left: size / 2 - stroke / 2, top: stemTop, backgroundColor: gold },
        ]}
      />
      <View
        style={[styles.arm, { width: armWidth, height: stroke, left: size / 2 - armWidth / 2, top: armY - stroke / 2 }]}
      />
      <View
        style={[
          styles.base,
          {
            width: baseWidth,
            height: stroke,
            left: size / 2 - baseWidth / 2,
            top: stemBottom - stroke / 2,
            backgroundColor: gold,
          },
        ]}
      />
      <View
        style={[
          styles.knob,
          {
            width: size * 0.09,
            height: size * 0.09,
            borderRadius: size * 0.09,
            left: size / 2 - size * 0.045,
            top: stemTop - size * 0.045,
            backgroundColor: gold,
          },
        ]}
      />
      <Pan cx={size / 2 - armWidth / 2 + stroke} armY={armY} size={size} stroke={stroke} gold={gold} />
      <Pan cx={size / 2 + armWidth / 2 - stroke} armY={armY} size={size} stroke={stroke} gold={gold} />
    </View>
  );
}

const styles = StyleSheet.create({
  stem: { position: 'absolute', borderRadius: 2 },
  arm: { position: 'absolute' },
  base: { position: 'absolute', borderRadius: 2 },
  knob: { position: 'absolute' },
  pan: { position: 'absolute' },
  panLine: { position: 'absolute' },
});