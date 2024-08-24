import { src, dest, watch } from "gulp";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";

const sass = gulpSass(dartSass);

export function compileCss(done) {
  src("./src/scss/app.scss", { sourcemaps: true })
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("./build/css", { sourcemaps: "." }));
  done();
}
export function dev() {
  watch("./src/scss/**/*.scss", compileCss);
}
