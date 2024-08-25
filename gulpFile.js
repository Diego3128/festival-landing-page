import { src, dest, watch, series } from "gulp";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";

const sass = gulpSass(dartSass);

export function js(done) {
  src("./src/js/app.js").pipe(dest("./build/js"));
  done();
}
export function compileCss(done) {
  src("./src/scss/app.scss", { sourcemaps: true })
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("./build/css", { sourcemaps: "." }));
  done();
}
export function dev() {
  watch("./src/scss/**/*.scss", compileCss);
  watch("./src/js/**/*.js", js);
}

export default series(js, compileCss, dev);
