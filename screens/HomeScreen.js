import React from 'react';
import { ScrollView, SafeAreaView, TouchableOpacity, Animated, Easing, StatusBar } from 'react-native';
import styled from 'styled-components';
import Card from '../components/Card';
import { NotificationIcon } from '../components/icons';
import Logo from '../components/Logo';
import Course from '../components/Course';
import Menu from '../components/Menu';
import { connect } from 'react-redux';
function mapStateToProps(state) {
  return { action: state.action };
}

function mapDispatchToProps(dispatch) {
  return {
    openMenu: () => {
      dispatch({
        type: 'OPEN_MENU'
      });
    }
  };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class HomeScreen extends React.Component {
  state = {
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1)
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.toggleMenu();
  }

  toggleMenu = () => {
    if (this.props.action === 'openMenu') {
      Animated.timing(this.state.scale, {
        toValue: 0.9,
        duration: 300,
        easing: Easing.in()
      }).start();
      Animated.spring(this.state.opacity, {
        toValue: 0.5
      }).start();
      StatusBar.setBarStyle("light-content", true);
    }

    if (this.props.action === 'closeMenu') {
      Animated.timing(this.state.scale, {
        toValue: 1,
        duration: 300,
        easing: Easing.in()
      }).start();
      Animated.spring(this.state.opacity, {
        toValue: 1
      }).start();
      StatusBar.setBarStyle("dark-content", true);
    }
  };

  render() {
    return (
      <RootView>
        <Menu />
        <AnimatedContainer style={{ transform: [{ scale: this.state.scale }], opacity: this.state.opacity }}>
          <SafeAreaView>
            <ScrollView style={{ height: '100%' }}>
              <TitleBar>
                <TouchableOpacity onPress={this.props.openMenu} style={{ position: 'absolute', top: 0, left: 20 }}>
                  <Avatar source={require('../assets/avatar.jpg')} />
                </TouchableOpacity>
                <Title>Welcome Back,</Title>
                <Name>rand</Name>
                <NotificationIcon style={{ position: 'absolute', right: 20, top: 5 }} />
              </TitleBar>
              <ScrollView
                style={{ flexDirection: 'row', padding: 20, paddingLeft: 12, paddingTop: 30 }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {logos.map((logo, index) => (
                  <Logo key={`logo_${index}`} image={logo.image} text={logo.text} />
                ))}
              </ScrollView>
              <Subtitle>Continue Learning</Subtitle>
              <ScrollView horizontal={true} style={{ paddingBottom: 30 }} showsHorizontalScrollIndicator={false}>
                {cards.map((card, index) => (
                  <Card
                    key={`card_${index}`}
                    title={card.title}
                    caption={card.caption}
                    subtitle={card.subtitle}
                    image={card.image}
                    logo={card.logo}
                  />
                ))}
              </ScrollView>
              <Subtitle>Popular Courses</Subtitle>
              {courses.map((course, index) => (
                <Course
                  key={`course_${index}`}
                  image={course.image}
                  title={course.title}
                  subtitle={course.subtitle}
                  logo={course.logo}
                  author={course.author}
                  avatar={course.avatar}
                  caption={course.caption}
                />
              ))}
            </ScrollView>
          </SafeAreaView>
        </AnimatedContainer>
      </RootView>
    );
  }
}

const RootView = styled.View`
  background-color: #333;
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
  background-color: #f0f3f5;
  border-radius: 10;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;
`;
const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;

const TitleBar = styled.View`
  margin-top: 50px;
  width: 100%;
  padding-left: 100px;
`;

const Avatar = styled.Image`
  width: 44px;
  height: 44px;
  background-color: black;
  border-radius: 22px;
  margin-left: 20px;
`;

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 20px;
  text-transform: uppercase;
`;

const logos = [
  {
    image: require('../assets/logo-framerx.png'),
    text: 'Framer X'
  },
  {
    image: require('../assets/logo-figma.png'),
    text: 'Figma'
  },
  {
    image: require('../assets/logo-react.png'),
    text: 'React'
  },
  {
    image: require('../assets/logo-studio.png'),
    text: 'Studio'
  },
  {
    image: require('../assets/logo-swift.png'),
    text: 'Swift'
  }
];

const cards = [
  {
    title: 'React Native for Designers',
    image: require('../assets/background11.jpg'),
    subtitle: 'React Native',
    caption: '1 of 12 sections',
    logo: require('../assets/logo-react.png')
  },
  {
    title: 'Styled Components',
    image: require('../assets/background12.jpg'),
    subtitle: 'React Native',
    caption: '2 of 12 sections',
    logo: require('../assets/logo-react.png')
  },
  {
    title: 'Props and Icons',
    image: require('../assets/background13.jpg'),
    subtitle: 'React Native',
    caption: '3 of 12 sections',
    logo: require('../assets/logo-react.png')
  },
  {
    title: 'Static Data and Loop',
    image: require('../assets/background14.jpg'),
    subtitle: 'React Native',
    caption: '4 of 12 sections',
    logo: require('../assets/logo-react.png')
  }
];

const courses = [
  {
    title: 'Prototype in InVision Studio',
    subtitle: '10 section',
    image: require('../assets/background11.jpg'),
    logo: require('../assets/logo-studio.png'),
    author: 'rand',
    avatar: require('../assets/avatar.jpg'),
    caption: 'Design and interactive prototype'
  },
  {
    title: 'Prototype in InVision Studio',
    subtitle: '10 section',
    image: require('../assets/background13.jpg'),
    logo: require('../assets/logo-studio.png'),
    author: 'rand',
    avatar: require('../assets/avatar.jpg'),
    caption: 'Design and interactive prototype'
  },
  {
    title: 'Prototype in InVision Studio',
    subtitle: '10 section',
    image: require('../assets/background13.jpg'),
    logo: require('../assets/logo-studio.png'),
    author: 'rand',
    avatar: require('../assets/avatar.jpg'),
    caption: 'Design and interactive prototype'
  },
  {
    title: 'Prototype in InVision Studio',
    subtitle: '10 section',
    image: require('../assets/background13.jpg'),
    logo: require('../assets/logo-studio.png'),
    author: 'rand',
    avatar: require('../assets/avatar.jpg'),
    caption: 'Design and interactive prototype'
  },
  {
    title: 'Prototype in InVision Studio',
    subtitle: '10 section',
    image: require('../assets/background13.jpg'),
    logo: require('../assets/logo-studio.png'),
    author: 'rand',
    avatar: require('../assets/avatar.jpg'),
    caption: 'Design and interactive prototype'
  }
];
