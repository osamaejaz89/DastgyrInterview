import React from 'react';
import { Text } from 'react-native'

export const renderEmpty = (loading) => !loading && <Text>No Data at the moment</Text>;
