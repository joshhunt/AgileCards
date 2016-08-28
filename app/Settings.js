import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  Switch,
} from 'react-native';

import { SegmentedControls } from 'react-native-radio-buttons';

import {
  TableView,
  Section,
  CustomCell,
  Cell,
} from 'react-native-tableview-simple';

import {
  MAX_CARD_OPTIONS,
  SEQUENCE_OPTIONS,
  COLOR_OPTIONS,
  TINT_FOR_COLOR,
} from './settingsValues';

const segmentedControlsProps = {
  containerStyle: { flex: 1, height: 28 },
  optionContainerStyle: { flex: 1, paddingBottom: 5, height: 28 },
};

const styles = StyleSheet.create({
  cellText: {
    flex: 1,
    fontSize: 17,
  },
});

export default class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = { ...props.settings };
    this.state.maxCardChoices = MAX_CARD_OPTIONS[this.state.cardSequence];
    this.state.colorOptionsTint = TINT_FOR_COLOR[this.state.color];
  }

  onCardSequenceChange = (selected) => {
    this.setSettings({
      cardSequence: selected,
      maxCard: undefined,
    });
  }

  onMaxCardChange = (value) => {
    this.setSettings({ maxCard: value });
  }

  onColorChange = (value) => {
    this.setSettings({ color: value });
  }

  onDisplayEmojiChange = (value) => {
    this.setSettings({ displayEmoji: value });
  }

  setSettings = (newSettings) => {
    const newState = { ...newSettings };

    if (newSettings.cardSequence) {
      newState.maxCardChoices = MAX_CARD_OPTIONS[newSettings.cardSequence];
    }

    if (newSettings.color) {
      newState.colorOptionsTint = TINT_FOR_COLOR[newSettings.color];
    }

    if (newSettings.hasOwnProperty('displayEmoji')) {
      newState.displayEmoji = newSettings.displayEmoji;
    }

    this.setState(newState, this.notifyNewSettings);
  }

  notifyNewSettings = () => {
    this.props.onChange({
      cardSequence: this.state.cardSequence,
      maxCard: this.state.maxCard,
      color: this.state.color,
      displayEmoji: this.state.displayEmoji,
      emoji: this.state.emoji,
    });
  }

  render() {
    const { cardSequence, maxCardChoices, colorOptionsTint, displayEmoji } = this.state;

    return (
      <ScrollView>
        <TableView>

          <Section header="CARDS" sectionTintColor="white">
            {SEQUENCE_OPTIONS.map(choice => (
              <Cell
                value={choice.value}
                key={choice.value}
                selected={cardSequence === choice.value}
                accessory={cardSequence === choice.value ? 'Checkmark' : null}
                onPress={this.onCardSequenceChange.bind(null, choice.value)}
                title={choice.label}
              />
            ))}
          </Section>

          { maxCardChoices && <Section header="LARGEST CARD" sectionTintColor="white">
            <CustomCell>
              <SegmentedControls
                {...segmentedControlsProps}
                options={maxCardChoices}
                selectedOption={this.props.settings.maxCard}
                onSelection={this.onMaxCardChange}
              />
            </CustomCell>
          </Section> }

          <Section header="COLOR SCHEME" sectionTintColor="white">
            <CustomCell>
              <SegmentedControls
                {...segmentedControlsProps}
                tint={colorOptionsTint}
                options={COLOR_OPTIONS}
                selectedOption={this.props.settings.color}
                onSelection={this.onColorChange}
              />
            </CustomCell>
          </Section>

          <Section header="EXTRAS" sectionTintColor="white">
            <CustomCell>
              <Text style={styles.cellText}>Last card emoji</Text>
              <Switch
                value={displayEmoji}
                onValueChange={this.onDisplayEmojiChange}
              />
            </CustomCell>
          </Section>
        </TableView>
      </ScrollView>
    );
  }
}
