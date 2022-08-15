from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS
import cv2
import numpy as np
import random

app = Flask(__name__)
api = Api(app)
datadir = '../images/'
SAMPLE_SIZE = 1000
CORS(app)


@app.route('/algorithm', methods=['POST'])
def post():
    # read image in cv2
    filename = datadir + request.form['file']
    print(filename)
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

    top_colors = sorted(pixel_samples.items(),
                        key=lambda x: x[1], reverse=True)[:3]
    # get only first color
    top_color = sorted(pixel_samples.items(),
                       key=lambda x: x[1], reverse=True)[:1]

    print(top_colors)

    return {'top_color': top_color[0][0]}


if __name__ == '__main__':
    app.run(debug=True)
