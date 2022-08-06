import React, { useState } from 'react';
import styles from './UserPhotoPost.module.css';
import useForm from '../../../Hooks/useForm';
import useFirebase from '../../../Hooks/useFirebase';
import Input from '../../../Components/Forms/Input';
import Button from '../../../Components/Forms/Button';
import Error from '../../../Components/Helper/Error';
const UserPhotoPost = () => {

  const title = useForm();
  const description = useForm();
  const [img, setImg] = useState({});

  const [imgError, setImgError] = useState(null);

  const { addPostFirebase, error, loading } = useFirebase();

  async function handlePost(e) {
    e.preventDefault();
    const validateFile =
      img.raw && img.regexType.test(img.type) && img.size < 2097152;

    if (title.validate() && description.validate() && validateFile) {
      await addPostFirebase(title.value, description.value, img.raw);
    } else {
      setImgError(
        'Apenas arquivos do tipo Imagem e abaixo de 2MB podem ser anexadas.',
      );
    }
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <form id="formPost" onSubmit={handlePost}>
        <Input label="Titulo" type="text" name="titulo" {...title} />
        <Input
          label="Descrição"
          type="text"
          name="descricao"
          {...description}
        />
        <input
          className={styles.file}
          type="file"
          name="img"
          id="img"
          multiple={false}
          accept="image/*"
          onChange={({ target }) =>
            setImg({
              preview: URL.createObjectURL(target.files[0]),
              raw: target.files[0],
              type: target.files[0].type,
              size: target.files[0].size,
              regexType: new RegExp('^(image/)'),
            })
          }
        />
        {loading ? (
          <Button disabled>Postando...</Button>
        ) : (
          <Button>Enviar</Button>
        )}
        <Error error={error} />
        <Error error={imgError} />
      </form>
      <div>
        {img.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url('${img.preview}')` }}
          ></div>
        )}
      </div>
    </section>
  );
};

export default UserPhotoPost;
