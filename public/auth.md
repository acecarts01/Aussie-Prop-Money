# Auth.md

Australian Reserve Props — public ecommerce catalog. No authentication is required to browse or read any resource.

## Agent Registration
No registration is needed. All resources below are public.

OAuth Protected Resource Metadata: https://australianreserveprops.com/.well-known/oauth-protected-resource
OpenID configuration: https://australianreserveprops.com/.well-known/openid-configuration

| Resource | URL |
|---|---|
| Shop | https://australianreserveprops.com/shop/ |
| Product catalog (JSON, read-only) | https://australianreserveprops.com/api/products/ |
| FAQ | https://australianreserveprops.com/faq/ |
| Wholesale | https://australianreserveprops.com/wholesale/ |

```json
{
  "agent_auth": {
    "register_uri": null,
    "identity_types_supported": ["none"],
    "credential_types_supported": ["none"],
    "notes": "No authentication required. All resources are public."
  }
}
```

Ordering is human-assisted: an agent may browse products and draft an order, but a human completes payment.
Age restriction: none. This site sells novelty currency only — not legal tender, not a financial product.
