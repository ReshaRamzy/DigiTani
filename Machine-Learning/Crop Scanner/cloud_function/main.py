import tensorflow as tf
from google.cloud import storage
import numpy as np
from PIL import Image
import json

model = None
BUCKET_NAME = 'digitani_model_scan'

def download_blob(bucket_name, source_blob_name, destination_file_name):
    storage_client = storage.Client()
    bucket = storage_client.get_bucket(bucket_name)
    blob = bucket.blob(source_blob_name)
    blob.download_to_filename(destination_file_name)

label_array = ['bacterial_leaf_blight', 'bacterial_leaf_streak', 'bacterial_panicle_blight', 
              'blast', 'brown_spot', 'dead_heart', 'downy_mildew', 'hispa', 'normal',
              'tungro']

def crop_scan(request):
    global model
    if model is None:
        download_blob(BUCKET_NAME, "scan.h5", "/tmp/scan.h5")
        model = tf.keras.models.load_model("/tmp/scan.h5")

    file = request.files.get('file')

    if not file:
        return json.dumps({'error': 'There is no file uploaded.'})

    image = Image.open(file)
    if image is None:
        return json.dumps({'error': 'Failed to open the image file.'})

    image = image.resize((224, 224))
    image = np.array(image) / 255.0
    image_expand = np.expand_dims(image, axis=0)

    predictions = model.predict(image_expand)
    predicted_class_encoded = tf.argmax(predictions, axis=1).numpy()[0]
    predicted_class = label_array[predicted_class_encoded]

    result = {'predicted_class': predicted_class}
    return json.dumps(result)