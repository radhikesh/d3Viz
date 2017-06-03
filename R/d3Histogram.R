
d3Histogram <- function(dataset, width = NULL, height = NULL) {

  # forward options using x
  x = list(
    dataset = dataset
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'd3Histogram',
    x,
    width = width,
    height = height,
    package = 'd3Viz'
  )
}

d3HistogramOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'd3Histogram', width, height, package = 'd3Viz')
}


renderD3Histogram <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, d3HistogramOutput, env, quoted = TRUE)
}
