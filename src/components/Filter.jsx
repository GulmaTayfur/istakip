import { useDispatch } from "react-redux";
import { sortOptions, statusOptions, typeOptions } from "../constants";
import {
  clearFilters,
  filterBySearch,
  sortJobs,
} from "../redux/slices/jobSlice";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

const Filter = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  // const debouncedText = useDebounce(text, 500);

  // her tuş vuruşunda filtreleme yapmak düşük donanımlı cihazlarda kasmalara ve donmalara sebep olabileceğinden filtreleme işlemini kullanıcı yazma işini bıraktığında yapmalıyız. bu işleme Debounce denir. ardışık olarak gerçekleşen fonksiyon çağırma işlemlerinde fonksiyonun kısa bir zaman aralığında çağrılmasını görmezden gelir.
  useEffect(() => {
    // bir sayaç başlat ve işlemi sayaç durduğunda yap
    const timer = setTimeout(() => {
      dispatch(filterBySearch({ text, name: "company" }));
    }, 500);

    //eğerki süre bitmeden tekrardan useEffect çalışırsa önceki sayacın çalışmasını durdur.
    return () => {
      clearTimeout(timer);
    };
  }, [text]);
  return (
    <section className="filter-sec">
      <h2>Filtreleme Formu</h2>
      <form>
        <div>
          <label>Şirket ismine ya da pozisyona göre ara</label>
          <input onChange={(e) => setText(e.target.value)} type="text" />
        </div>

        <div>
          <label>Durum</label>
          <select
            onChange={(e) =>
              dispatch(filterBySearch({ name: "status", text: e.target.value }))
            }
          >
            <option hidden>Seçiniz</option>
            {statusOptions.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Tür</label>
          <select
            onChange={(e) =>
              dispatch(filterBySearch({ name: "type", text: e.target.value }))
            }
          >
            <option hidden>Seçiniz</option>
            {typeOptions.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Sırala</label>
          <select onChange={(e) => dispatch(sortJobs(e.target.value))}>
            <option hidden>Seçiniz</option>
            {sortOptions.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button
            onClick={() => dispatch(clearFilters())}
            type="reset"
            id="special-button"
          >
            <span className="circle1"></span>
            <span className="circle2"></span>
            <span className="circle3"></span>
            <span className="circle4"></span>
            <span className="circle5"></span>
            <span className="text">Filtreleri Sıfırla</span>
          </button>
        </div>
      </form>
    </section>
  );
};

export default Filter;
