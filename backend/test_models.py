import google.generativeai as genai

genai.configure(
    api_key="AQ.Ab8RN6JyTvhB1gqcuFzTL0J6lHeRJqmpDtxlzmyqE7OC3uJIFw"
)

for model in genai.list_models():
    print(model.name)