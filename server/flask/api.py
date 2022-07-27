from flask import Flask, request
from flask_restful import Resource, Api
import cv2
import numpy as np
import random

app = Flask(__name__)
api = Api(app)
datadir = '../images/'
SAMPLE_SIZE = 1000


class Colors(Resource):
    def get(self):
        return {'1': '#FFFFFF'}

    def put(self):
        # read image in cv2
        filename = datadir + request.form['file']
        image = cv2.imread(filename)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        # slice image
        h, w, c = image.shape
        h_start, h_end = h // 4, (h * 3) // 4
        w_start, w_end = w // 4, (w * 3) // 4

        inner_image = image[h_start:h_end, w_start:w_end]
        h_inner, w_inner, c_inner = inner_image.shape

        # sample pixels
        pixel_samples = {}
        for i in range(SAMPLE_SIZE):
            pixel = inner_image[random.randint(
                0, h_inner - 1), random.randint(0, w_inner - 1)]

            pixel_hex = '#%02x%02x%02x' % (pixel[0], pixel[1], pixel[2])
            if pixel_hex in pixel_samples:
                pixel_samples[pixel_hex] += 1
            else:
                pixel_samples[pixel_hex] = 1

            top_colors = sorted(
                pixel_samples.items(), key=lambda x: x[1], reverse=True)[:10]

        return {'file': inner_image.shape, 'pixel_samples': pixel_samples, 'top_colors': top_colors}


api.add_resource(Colors, '/')

if __name__ == '__main__':
    app.run(debug=True)
