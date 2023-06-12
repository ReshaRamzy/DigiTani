from flask import Flask, jsonify, request
import tensorflow as tf
from tensorflow.python.lib.io import file_io
import numpy as np
import os
from sklearn.preprocessing import LabelEncoder

app = Flask(__name__)

def load_model():
    model_path = 'gs://digitani_model_recom/rec.h5'

    with file_io.FileIO(model_path, mode='rb') as model_file:
        model = tf.keras.models.load_model(model_file)
    
    return model

model = load_model()
label_encoder = LabelEncoder()

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    input_data = np.array(data['input_data']).reshape(1, -1)
    predictions = model.predict(input_data)
    predicted_class_encoded = np.argmax(predictions)
    predicted_class = label_encoder.inverse_transform([predicted_class_encoded])[0]
    return jsonify({'predicted_class': predicted_class})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))