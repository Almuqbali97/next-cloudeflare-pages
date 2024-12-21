'use client'
import { useRef, useState } from 'react';
import styles from './image-picker.module.css';
import Image from 'next/image';

export default function ImgagePicker({ label, name }) {
    const [pickedImage, setPickedImage] = useState(null);

    const imageInput = useRef();
    function hanldePickClick() {
        imageInput.current.click();
    }

    function handleImageChange(event) {
        const file = event.target.files[0];

        // If the user has not picked a file
        if (!file) {
            setPickedImage(null);
            return;
        }

        const fileReader = new FileReader();

        // Set up what happens when the file is fully read
        fileReader.onload = () => {
            setPickedImage(fileReader.result);  // This will log the base64 string
        };

        // Trigger the reading of the file
        fileReader.readAsDataURL(file);
    }


    return (
        <div className={styles.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={styles.controls}>
                <div className={styles.preview}>
                    {!pickedImage && <p>No image picked yet.</p>}
                    {pickedImage && <Image
                        src={pickedImage}
                        alt='The image selected by the user'
                        fill
                    />}
                </div>
                <input
                    ref={imageInput}
                    className={styles.input}
                    type='file'
                    id={name}
                    accept='image/png, image/jpeg, image/JPG'
                    name={name}
                    onChange={handleImageChange}
                    required
                />
                <button
                    className={styles.button}
                    onClick={hanldePickClick}
                    type='button'
                    aria-label="Pick an image"
                >
                    Pick An Image
                </button>
            </div>
        </div>
    )
}  