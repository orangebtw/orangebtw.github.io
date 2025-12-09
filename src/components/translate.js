import React, { useEffect, useState } from "react";
import axios from "axios";

const doTranslation = async (input, languageCode, cancelToken) => {
  try {
    const { data } = await axios.get(
      `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20251209T130043Z.7e63ef94929c9ea5.8624841b0c6523f998bc2db0b7fa70bf30444658&lang=ru-${languageCode}&text=${input}`,
    );

    return data.def[0].tr[0].text;
  } catch (err) {
    return "";
  }
};

export default ({ language, text }) => {
  const [translated, setTranslated] = useState("");

  useEffect(() => {
    if (!text) {
      return;
    }

    const cancelToken = axios.CancelToken.source();

    doTranslation(text, language, cancelToken).then(setTranslated);

    return () => {
      try {
        cancelToken.cancel();
      } catch (err) {}
    };
  }, [text, language]);

  return (
    <div>
      <label className="label">Output</label>
      <h1 className="title">{translated}</h1>
    </div>
  );
};
