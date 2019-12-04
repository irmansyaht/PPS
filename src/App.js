import React from 'react';
import './App.css';
import Styles from './Styles'
import { Form, Field } from 'react-final-form'
//import pickupTimes from './pickupTimes'
import 'bootstrap/dist/css/bootstrap.css';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
}

const Error = ({ name }) => (
  <Field name={name} subscription={{ error: true, touched: true }}>
    {({ meta: { error, touched } }) =>
      error && touched ? <span>{error}</span> : null
    }
  </Field>
)

const Condition = ({ when, is, children }) => (
  <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) => (value === is ? children : null)}
  </Field>
)

const App = () => (
  <Styles>
    <h1> PPSv1-Demo </h1>
    
    <Form
      onSubmit={onSubmit}
      validate={values => {
        const errors = {}
        if (!values.Nama) {
          errors.firstName = 'Required'
        }
        if (!values.Ambulasi) {
          errors.Ambulasi = 'Required'
        }
        // if (values.Ambulasi === 'delivery') {
        //   if (!values.street) {
        //     errors.street = 'Required'
        //   }
        // } else if (values.reception === 'pickup') {
        //   if (!values.pickupTime) {
        //     errors.pickupTime = 'Required'
        //   }
        // }
        return errors
      }}
    >
      {({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nama</label>
            <Field
              name="Nama"
              component="input"
              type="text"
              placeholder="Nama"
            />
            <Error name="Nama" />
          </div>
          <div>
            <label>Ambulasi</label>
            <div>
              <label>
              <Field name="Ambulasi" component="select">
              <option />
              <option value="Penuh">Penuh</option>
              <option value="Berkurang">Berkurang</option>
              <option value="Duduk">Sebagian besar duduk / berbaring</option>
              <option value="Tidur1">Sebagian besar di tempat tidur</option>
              <option value="Tidur2">Benar-benar tidur terikat </option>
            </Field>
              </label>
            </div>
            <Error name="Ambulasi" />
          </div>
          <Condition when="Ambulasi" is="Penuh">
            <div>
            <label>Aktivitas</label>
            <Field name="Aktivitas" component="select">
              <option />
            <option value="Normal">Aktivitas & kerja normal Tidak ada bukti penyakit </option>
            <option value="Ada Penyakit">Aktivitas & kerja normal Terbukti memiliki beberapa penyakit </option>
            </Field>
            </div>

          </Condition>
          <Condition when="Ambulasi" is="Berkurang">
            <div>
            <label>Aktivitas</label>
            <Field name="Aktivitas" component="select">
              <option />
            <option value="Tidak dapat bekerja">Tidak dapat melakukan pekerjaan/ bekerja dengan normal Penyakit yang signifikan </option>
            <option value="Tidak dapat hobi">Tidak dapat menngerjakan hobi/ pekerjaan rumah Penyakit yang signifikan </option>
            </Field>
            </div>
            <Error name="Aktivitas" />
          </Condition>
          
          <Condition when="Ambulasi" is="Duduk">
            <div>
            <label>Aktivitas</label>
            <Field name="Aktivitas" component="select">
              <option />
            <option value="Tidak melakukan bekerja">Tidak dapat melakukan pekerjaan apapun Penyakit yang meluas </option>
            </Field>
            </div>
            <Error name="Aktivitas" />
          </Condition>
          
          <Condition when="Ambulasi" is="Tidur1">
            <div>
            <label>Aktivitas</label>
            <Field name="Aktivitas" component="select">
              <option />
            <option value="Tidak melakukan aktivitas">Tidak dapat melakukan sebagian besar aktivitas Penyakit yang meluas </option>
            </Field>
            </div>
            <Error name="Aktivitas" />
          </Condition>

          <Condition when="Ambulasi" is="Tidur2">
            <div>
            <label>Aktivitas</label>
            <Field name="Aktivitas" component="select">
              <option />
            <option value="Tidak melakukan aktivitas">Tidak dapat melakukan sebagian besar aktivitas Penyakit yang meluas </option>
            </Field>
            </div>
            <Error name="Aktivitas" />
          </Condition>

          <Condition when="Aktivitas" is="Normal">
            <div>
            <label>Perawatan Diri</label>
            <Field name="PerawatanDiri" component="select">
              <option />
            <option value="Mandiri">Mandiri </option>
            
            </Field>
            </div>
            <Error name="PerawatanDiri" />
          </Condition>
          
          <Condition when="Aktivitas" is="Ada Penyakit">
            <div>
            <label>Perawatan Diri</label>
            <Field name="PerawatanDiri" component="select">
              <option />
            <option value="Mandiri">Mandiri </option>
            <option value="Perlu Bantuan Sesekali">Perlu Bantuan Sesekali </option>
            </Field>
            </div>
            <Error name="PerawatanDiri" />
          </Condition>

          <div className="buttons">
            <button type="submit" disabled={submitting}>
              Submit
            </button>
            <button type="button" onClick={form.reset} disabled={submitting}>
              Reset
            </button>
          </div>
          <pre>{JSON.stringify(values, 0, 2)}</pre>
        </form>
      )}
    </Form>
  </Styles>
)

export default App;
