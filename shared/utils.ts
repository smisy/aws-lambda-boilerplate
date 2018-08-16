// A function to extract the HTTP method and the resource path
// from event.methodArn.
const extractMethodAndPath = (
  arn: string
): { httpMethod: string; resourcePath: string } => {
  // The value of 'arn' follows the format shown below.
  //
  //   arn:aws:execute-api:<regionId>:<accountId>:<apiId>/<stage>/<method>/<resourcePath>"
  //
  // See 'Enable Amazon API Gateway Custom Authorization' for details.
  //
  //   http://docs.aws.amazon.com/apigateway/latest/developerguide/use-custom-authorizer.html
  //

  // Check if the value of 'arn' is available just in case.
  if (!arn) {
    // HTTP method and a resource path are not available.
    return { httpMethod: undefined, resourcePath: undefined };
  }

  let arnElements = arn.split(':', 6);
  let [apiId, stage, httpMethod, ...rest] = arnElements[5].split('/');
  console.log('apiId:', apiId);
  console.log('stage:', stage);

  let resourcePath = `/${rest.join('/')}`;
  // Return the HTTP method and the resource path as a string array.
  return { httpMethod, resourcePath };
};

const utils = { extractMethodAndPath };

export { utils };
