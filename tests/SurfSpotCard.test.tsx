// tests\SurfSpotCard.test.tsx

import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import SurfSpotCard from 'shakafront/components/SurfSpotCard';

const spot = {
  surfSpotId: 's1',
  destination: 'Hossegor',
  address: 'Some beach',
  photoUrls: [],
  breakTypes: [],
  influencers: [],
} as any;

it('handles press and favorite toggle', () => {
  const onPress = jest.fn();
  const onFav = jest.fn();

  const { getByText, getByTestId } = render(
    <SurfSpotCard
      spot={spot}
      isFavorite={false}
      onFavoriteToggle={onFav}
      onPress={onPress}
    />,
  );

  fireEvent.press(getByText('Hossegor'));
  expect(onPress).toHaveBeenCalled();

  fireEvent.press(getByTestId('favorite-toggle'));
  expect(onFav).toHaveBeenCalled();
});
