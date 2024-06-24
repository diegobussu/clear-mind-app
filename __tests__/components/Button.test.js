import React from 'react';
import renderer from 'react-test-renderer';
import Button from '../../components/Button';

describe('Button Component', () => {
  it('rendu du texte', () => {
    const component = renderer.create(
      <Button text="Test Button" onPress={() => {}} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('onPress fonctionnel', () => {
    const onPressMock = jest.fn();
    const component = renderer.create(
      <Button text="Test Button" onPress={onPressMock} />
    );
    const buttonInstance = component.root.findByType(Button);

    buttonInstance.props.onPress();

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
