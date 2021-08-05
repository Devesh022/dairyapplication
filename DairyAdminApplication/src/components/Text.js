import React, { Component } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';
import {
  spacing,
  parseSpacing,
  mergeTheme,
} from '../utils';
import baseTheme from '../utils/theme'

class Typography extends Component {
  getSpacings(type) {
    const {
      margin,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      marginVertical,
      marginHorizontal,
      padding,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      paddingVertical,
      paddingHorizontal,
      theme,
    } = this.props;
    const { SIZES } = mergeTheme(baseTheme, theme);

    if (type === 'margin') {
      return [
        margin && spacing(type, margin, SIZES.base),
        marginTop && parseSpacing('marginTop', marginTop, SIZES.base),
        marginRight && parseSpacing('marginRight', marginRight, SIZES.base),
        marginBottom && parseSpacing('marginBottom', marginBottom, SIZES.base),
        marginLeft && parseSpacing('marginLeft', marginLeft, SIZES.base),
        marginVertical &&
          parseSpacing('marginVertical', marginVertical, SIZES.base),
        marginHorizontal &&
          parseSpacing('marginHorizontal', marginHorizontal, SIZES.base),
      ];
    }

    if (type === 'padding') {
      return [
        padding && spacing(type, padding, SIZES.base),
        paddingTop && parseSpacing('paddingTop', paddingTop, SIZES.base),
        paddingRight && parseSpacing('paddingRight', paddingRight, SIZES.base),
        paddingBottom &&
          parseSpacing('paddingBottom', paddingBottom, SIZES.base),
        paddingLeft && parseSpacing('paddingLeft', paddingLeft, SIZES.base),
        paddingVertical &&
          parseSpacing('paddingVertical', paddingVertical, SIZES.base),
        paddingHorizontal &&
          parseSpacing('paddingHorizontal', paddingHorizontal, SIZES.base),
      ];
    }
  }

  render() {
    const {
      // fonts & sizes
      h1,
      h2,
      h3,
      title,
      subtitle,
      caption,
      small,
      size,
      // styling
      transform,
      regular,
      bold,
      semibold,
      medium,
      weight,
      light,
      center,
      right,
      spacing, // letter-spacing
      height, // line-height
      // colors
      color,
      primary,
      secondary,
      tertiary,
      black,
      white,
      gray,
      error,
      warning,
      success,
      info,
      animated,
      theme,
      style,
      children,
      ...props
    } = this.props;

    const excludeProps = [
      'margin',
      'marginTop',
      'marginRight',
      'marginBottom',
      'marginLeft',
      'marginVertical',
      'marginHorizontal',
      'padding',
      'paddingTop',
      'paddingRight',
      'paddingBottom',
      'paddingLeft',
      'paddingVertical',
      'paddingHorizontal',
    ];
    const extraProps = Object.keys(props).reduce((prop, key) => {
      if (!excludeProps.includes(`${key}`)) {
        prop[key] = props[key];
      }
      return prop;
    }, {});

    const { SIZES, COLORS, FONTS, WEIGHTS } = mergeTheme(
      { ...baseTheme },
      theme,
    );

    const marginSpacing = this.getSpacings('margin');
    const paddingSpacing = this.getSpacings('padding');

    const textStyles = StyleSheet.flatten([
      {
        fontWeight: WEIGHTS.regular,
        fontSize: SIZES.font,
        color: COLORS.font,
      },
      h1 && FONTS.h1,
      h2 && FONTS.h2,
      h3 && FONTS.h3,
      title && FONTS.title,
      subtitle && FONTS.subtitle,
      caption && FONTS.caption,
      small && FONTS.small,
      size && { fontSize: size },
      marginSpacing,
      paddingSpacing,
      transform && { textTransform: transform },
      height && { lineHeight: height },
      spacing && { letterSpacing: spacing },
      weight && { fontWeight: weight },
      regular && { fontWeight: WEIGHTS.regular },
      bold && { fontWeight: WEIGHTS.bold },
      semibold && { fontWeight: WEIGHTS.semibold },
      medium && { fontWeight: WEIGHTS.medium },
      light && { fontWeight: WEIGHTS.light },
      center && styles.center,
      right && styles.right,
      // color shortcuts
      primary && { color: COLORS.primary },
      secondary && { color: COLORS.secondary },
      tertiary && { color: COLORS.tertiary },
      black && { color: COLORS.black },
      white && { color: COLORS.white },
      gray && { color: COLORS.gray },
      error && { color: COLORS.error },
      warning && { color: COLORS.warning },
      success && { color: COLORS.success },
      info && { color: COLORS.info },
      color && { color },
      style, // rewrite predefined styles
    ]);

    if (animated) {
      return (
        <Animated.Text style={textStyles} {...extraProps}>
          {children}
        </Animated.Text>
      );
    }

    return (
      <Text style={textStyles} {...extraProps}>
        {children}
      </Text>
    );
  }
}

Typography.defaultProps = {
  // fonts & sizes
  h1: false,
  h2: false,
  h3: false,
  title: false,
  subtitle: false,
  caption: false,
  small: false,
  size: null,
  margin: null,
  padding: null,
  // styling
  transform: null,
  regular: false,
  bold: false,
  semibold: false,
  medium: false,
  weight: false,
  light: false,
  center: false,
  right: false,
  spacing: null, // letter-spacing
  height: null, // line-height
  // colors
  color: null,
  primary: false,
  secondary: false,
  tertiary: false,
  black: false,
  white: false,
  gray: false,
  error: false,
  warning: false,
  success: false,
  info: false,
  theme: {},
  style: {},
};

export default Typography;

const styles = StyleSheet.create({
  // positioning
  center: { textAlign: 'center' },
  right: { textAlign: 'right' },
});
