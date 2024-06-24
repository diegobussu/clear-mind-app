import React from 'react';
import renderer from 'react-test-renderer';
import ButtonWhite from '../../components/ButtonWhite';

describe('Button Component', () => {
  it('rendu du texte', () => {
    const component = renderer.create(
      <ButtonWhite text="Test ButtonWhite" onPress={() => {}} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('onPress fonctionnel', () => {
    const onPressMock = jest.fn();
    const component = renderer.create(
      <ButtonWhite text="Test ButtonWhite" onPress={onPressMock} />
    );
    const buttonInstance = component.root.findByType(ButtonWhite);

    buttonInstance.props.onPress();

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
