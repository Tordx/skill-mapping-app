import React from 'react';
import { View, Text } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { styles } from '../../styles';
import { black, theme, white } from '../../assets/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
type Props = {
    currentPosition: number,
}

export const Steps: React.FC<Props>  = ({currentPosition}) => {
  const labels = ["1", "2", "3", "4"];

  const stepIndicatorStyles = {
    stepIndicatorSize: 35,
    currentStepIndicatorSize: 35,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 1,
    stepStrokeCurrentColor: black.main,
    stepStrokeWidth: 1,
    stepStrokeFinishedColor: black.main,
    stepStrokeUnFinishedColor: black.main,
    separatorFinishedColor: theme.accenta,
    separatorUnFinishedColor: black.main,
    stepIndicatorFinishedColor: theme.secondary,
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: theme.secondary,
    stepIndicatorLabelFontSize: 15,
    currentStepIndicatorLabelFontSize: 15,
    stepIndicatorLabelCurrentColor: white.main,
    stepIndicatorLabelFinishedColor: white.main,
    stepIndicatorLabelUnFinishedColor: '#ffffff',
    labelColor: '#000000',
    labelSize: 13,
    currentStepLabelColor: black.B006,
    finishedLabelColor: white.main
  };

  return (
    <View style={styles.stepscontainer}>
      <StepIndicator
        customStyles={stepIndicatorStyles}
        currentPosition={currentPosition}
        stepCount={4}
        renderStepIndicator={(params) =>{ console.log(params);
         return(
            <View style={[styles.stepIndicator, params.stepStatus === 'current' && styles.currentStep]}>
            {params.stepStatus === 'finished' ? <Icon color = {white.main} size = {25}name = 'check' style={styles.currentStepLabel}/> : <Text style={[styles.stepLabel, params.stepStatus === 'current' && styles.currentStepLabel, params.stepStatus === 'finished' && {color: white.main}]}>
                {labels[params.position]}
              </Text>}
            
            </View>
           
          )}}
          />
    </View>
  );
};