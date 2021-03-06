// import React, { Component } from 'react';
// import { Animated, Text, View } from 'react-native';

// class FadeInView extends Component {
//   state = {
//     fadeAnim: new Animated.Value(0), // Initial value for opacity: 0
//   };

//   componentDidMount() {
//     const { fadeAnim } = this.state;
//     Animated.timing(
//       // Animate over time
//       fadeAnim,
//       // The animated value to drive
//       {
//         toValue: 1, // Animate to opacity: 1 (opaque)
//         duration: 10000, // Make it take a while
//         useNativeDriver: true,
//       },
//     ).start(); // Starts the animation
//   }

//   render() {
//     const { fadeAnim } = this.state;
//     const { style, children } = this.props;

//     return (
//       <Animated.View
//         // Special animatable View
//         style={{
//           ...style,
//           opacity: fadeAnim, // Bind opacity to animated value
//         }}
//       >
//         {children}
//       </Animated.View>
//     );
//   }
// }

// // You can then use your `FadeInView` in place of a `View` in your components:
// export default class App extends Component {
//   render() {
//     return (
//       <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//         <FadeInView style={{width: 250, height: 50, backgroundColor: 'powderblue'}}>
//           <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>Fading in</Text>
//         </FadeInView>
//       </View>
//     )
//   }
// }
