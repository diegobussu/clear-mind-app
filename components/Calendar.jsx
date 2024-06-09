import React from 'react';
import { View, Alert } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';

LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre'
  ],
  monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: "Aujourd'hui"
};

LocaleConfig.defaultLocale = 'fr';

const CustomCalendar = ({ selectedDate, onDayPress, showCalendar }) => {
  const today = moment().format('YYYY-MM-DD');
  return (
    <View style={{ position: 'absolute', top: 80, right: 50, left: 50, zIndex: 1, borderRadius: 10, overflow: 'hidden', backgroundColor: 'black'}}>
      {showCalendar && (
        <Calendar
          locale="fr"
          theme={{
            arrowColor: '#6331FF'
          }}
          firstDay={1}
          style={{ backgroundColor: '#FFF' }}
          markedDates={{
            [selectedDate.format('YYYY-MM-DD')]: { selected: true, selectedColor: '#B08FFF' },
            [today]: { selected: true, selectedColor: '#6331FF' }
          }}
          onDayPress={(day) => {
            const selectedDay = moment(day.dateString);
            if (selectedDay.isAfter(moment(), 'day')) {
              Alert.alert("Ce jour n'est pas encore arrivé");
            } else {
              onDayPress(selectedDay);
            }
          }}
        />
      )}
    </View>
  );
};

export default CustomCalendar;
