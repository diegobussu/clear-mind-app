import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../../components/Button';

describe('Button Component', () => {
  it('rend du texte', () => {
    const { getByText } = render(<Button text="Test Button" onPress={() => {}} />);
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('onPress fonctionnel', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button text="Test Button" onPress={onPressMock} />);

    fireEvent.press(getByText('Test Button'));

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
