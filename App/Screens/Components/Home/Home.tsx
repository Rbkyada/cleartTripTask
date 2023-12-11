import React, { useContext, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import {
  CustomText,
  Layout,
  BottomModalContainer,
  CustomTextInput,
} from '@CommonComponent';
import { ButtonComponent } from '@SubComponents';
import { AppContext } from '@AppContext';
import { height, width } from '@Utils/Constant';
import { useAppDispatch, useAppSelector } from '@Stores';
import { addOrRemoveNotes } from '@Actions/UserActions';
import { NotesList } from '@Utils/Interface';

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  btnStyle: {
    width: width * 0.46,
    height: 50,
  },
  separator: {
    height: 10,
  },
  cardStyle: {
    padding: 10,
    borderRadius: 10,
  },
});

const Home = () => {
  const { appTheme, translations } = useContext(AppContext);

  const dispatch = useAppDispatch();

  const useDefault = useAppSelector(state => state.user);
  const { notesList } = useDefault;

  const [isShowModal, setShowModal] = useState(false);

  const { btnContainer, btnStyle, separator, cardStyle } = styles;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const onNoteSave = () => {
    if (title === '' || description === '') {
      return;
    }
    const payload = {
      title,
      description,
    };
    dispatch(
      addOrRemoveNotes({
        ...useDefault,
        notesList: [...useDefault.notesList, payload],
      }),
    );
  };

  const renderItem = ({ item }: { item: NotesList }) => {
    return (
      <View style={[cardStyle, { backgroundColor: appTheme.border }]}>
        <CustomText xlarge>{item.title}</CustomText>
        <CustomText numberOfLines={1}>{item.description}</CustomText>
      </View>
    );
  };

  const itemSeparator = () => {
    return <View style={separator} />;
  };

  return (
    <Layout title={translations.NOTES} padding={10}>
      <View>
        <FlatList
          data={notesList}
          ItemSeparatorComponent={itemSeparator}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <ButtonComponent
        onPress={() => {
          setShowModal(true);
        }}
        backColor={appTheme.themeColor}
        title="Show Modal"
        borderRadius={10}
      />
      <BottomModalContainer
        title={translations.ADD_NOTE}
        onClose={() => setShowModal(false)}
        show={isShowModal}>
        <CustomTextInput
          placeholder={translations.TITLE_PLACEHOLDER}
          value={title}
          onTextChange={text => setTitle(text)}
          label={translations.TITLE}
        />
        <CustomTextInput
          placeholder={translations.DESCRIPTION_PLACEHOLDER}
          value={description}
          onTextChange={text => setDescription(text)}
          label={translations.DESCRIPTION}
          multiline={true}
        />
        <View style={btnContainer}>
          <ButtonComponent
            title={translations.CANCEL}
            backColor={appTheme.themeColor}
            style={btnStyle}
            borderRadius={10}
            onPress={() => {
              setShowModal(false);
            }}
          />
          <ButtonComponent
            title={translations.SAVE}
            backColor={appTheme.themeColor}
            borderRadius={10}
            style={btnStyle}
            onPress={() => {
              setShowModal(false);
              onNoteSave();
            }}
          />
        </View>
        <View style={{ height: height * 0.4 }} />
      </BottomModalContainer>
    </Layout>
  );
};

export default Home;
