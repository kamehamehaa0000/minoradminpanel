const extractErrorMessage = (htmlContent) => {
  // Define regular expression to match error message within <pre> tags
  const regex = /<pre>(.*?)<br>/s
  const match = htmlContent.match(regex)
  if (match) {
    // Extract error message from the first match
    const errorMessage = match[1]
    return errorMessage
  } else {
    // If no match found, return the whole content
    return htmlContent
  }
}
export default extractErrorMessage
