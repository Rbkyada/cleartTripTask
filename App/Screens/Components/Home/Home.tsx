import React, { useCallback, useContext, useRef, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import {
  Layout,
  BottomModalContainer,
  NotesCard,
  CustomText,
} from '@CommonComponent';
import { ButtonComponent } from '@SubComponents';
import { AppContext } from '@AppContext';
import { useAppDispatch, useAppSelector } from '@Stores';
import { NotesList } from '@Utils/Interface';
import { addOrRemoveNotes } from '@Actions/UserActions';
import { ModelNoteView } from '@CommonComponent/ModelNoteView';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  flatCom: {
    flexGrow: 1,
  },
  emptyTextStyles: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Home = () => {
  const { appTheme, translations } = useContext(AppContext);

  const dispatch = useAppDispatch();
  const scrollRef = useRef(null);

  const useDefault = useAppSelector(state => state.user);
  const { notesList } = useDefault;

  const { separator, flatCom, emptyTextStyles } = styles;

  const [isShowModal, setShowModal] = useState(false);

  const onNoteRemove = useCallback((item: NotesList) => {
    let data = notesList.filter((value: NotesList) => value.id !== item.id);
    dispatch(addOrRemoveNotes({ ...useDefault, notesList: data }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = ({ item, index }: { item: NotesList; index: number }) => {
    return (
      <NotesCard
        item={item}
        index={index}
        onDismiss={onNoteRemove}
        simultaneousHandlers={scrollRef}
      />
    );
  };

  const itemSeparator = useCallback(() => {
    return <View style={separator} />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderEmptyComponent = useCallback(() => {
    return (
      <View style={emptyTextStyles}>
        <CustomText large>{translations.EMPTY_NOTES}</CustomText>
      </View>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout title={translations.NOTES} padding={10}>
      <FlatList
        ref={scrollRef}
        data={notesList}
        ItemSeparatorComponent={itemSeparator}
        renderItem={renderItem}
        contentContainerStyle={flatCom}
        ListEmptyComponent={renderEmptyComponent}
        keyExtractor={(item, index) => index.toString()}
      />

      <ButtonComponent
        onPress={() => {
          setShowModal(true);
        }}
        backColor={appTheme.themeColor}
        title={translations.ADD_NOTE}
        borderRadius={10}
      />
      <BottomModalContainer
        title={translations.ADD_NOTE}
        onClose={() => setShowModal(false)}
        show={isShowModal}>
        <ModelNoteView setShowModal={setShowModal} />
      </BottomModalContainer>
    </Layout>
  );
};

export default Home;
