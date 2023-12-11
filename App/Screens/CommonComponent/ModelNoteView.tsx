import React, { useContext, useState, memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { generateUniqueId } from '@Utils/Helper';
import { useAppDispatch, useAppSelector } from '@Stores';
import { addOrRemoveNotes } from '@Actions/UserActions';
import { CustomTextInput } from '@CommonComponent/CustomTextInput';
import { ButtonComponent } from '@SubComponents';
import { AppContext } from '@AppContext';
import { height, width } from '@Utils/Constant';

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
});

interface ModeNoteProps {
  setShowModal: (value: boolean) => void;
}

const ModelNoteView = memo((props: ModeNoteProps) => {
  const { appTheme, translations } = useContext(AppContext);

  const dispatch = useAppDispatch();
  const useDefault = useAppSelector(state => state.user);
  const { btnContainer, btnStyle } = styles;

  const { setShowModal } = props;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const onNoteSave = () => {
    if (!title || !description) {
      return;
    }
    let data = {
      id: generateUniqueId(),
      title: title,
      description: description,
    };

    console.log('data', data);
    dispatch(
      addOrRemoveNotes({
        ...useDefault,
        notesList: [...useDefault.notesList, data],
      }),
    );
    setTitle('');
    setDescription('');
    setShowModal(false);
  };
  return (
    <>
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
          onPress={onNoteSave}
        />
      </View>
      <View style={{ height: height * 0.34 }} />
    </>
  );
}, []);

export { ModelNoteView };
