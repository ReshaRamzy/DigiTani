import tensorflow as tf
from flask import jsonify, request
from google.cloud import storage
import numpy as np

model = None
BUCKET_NAME = 'digitani_model_recom'

def download_blob(bucket_name, source_blob_name, destination_file_name):
    storage_client = storage.Client()
    bucket = storage_client.get_bucket(bucket_name)
    blob = bucket.blob(source_blob_name)

    blob.download_to_filename(destination_file_name)


label_array = ['rice', 'maize', 'chickpea', 'kidneybeans', 'pigeonpeas',
               'mothbeans', 'mungbean', 'blackgram', 'lentil', 'pomegranate',
               'banana', 'mango', 'grapes', 'watermelon', 'muskmelon', 'apple',
               'orange', 'papaya', 'coconut', 'cotton', 'jute', 'coffee']


def crop_rec(request):
    global model
    if model is None:
        download_blob(
            BUCKET_NAME,
            "rec.h5",
            "/tmp/rec.h5"
        )
        model = tf.keras.models.load_model("/tmp/rec.h5")
        
    input_data = request.get_json().get('input_data')
    input_data = np.array(input_data).reshape(1, -1)
    predictions = model.predict(input_data)
    predicted_class_encoded = tf.argmax(predictions, axis=1).numpy()[0]
    predicted_class = label_array[predicted_class_encoded]

    print(f"Predictions : {predicted_class}")
    result = {'predicted_class': predicted_class}
    return jsonify(result)
